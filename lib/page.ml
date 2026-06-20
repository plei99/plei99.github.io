type page =
  | Home of I18n.locale
  | Notes
  | Papers
  | Travel
  | SeminarIndex
  | SeminarPage of string
  | Now of I18n.locale

let read_yaml path = Yaml_unix.of_file_exn (Fpath.v path)

let read_file path =
  let input = open_in path in
  Fun.protect
    ~finally:(fun () -> close_in input)
    (fun () -> really_input_string input (in_channel_length input))

let field key = function
  | `O fields -> List.assoc_opt key fields
  | _ -> None

let string_field key yaml =
  match field key yaml with
  | Some (`String value) -> value
  | _ -> ""

let list_field key yaml =
  match field key yaml with
  | Some (`A values) -> values
  | _ -> []

let int_field key yaml =
  match field key yaml with
  | Some (`Float value) -> Some (int_of_float value)
  | Some (`String value) -> int_of_string_opt value
  | _ -> None

let mkdir_p dir =
  let rec loop path =
    if path = "." || path = "/" || Sys.file_exists path then ()
    else (
      loop (Filename.dirname path);
      Unix.mkdir path 0o755)
  in
  loop dir

let write_file path contents =
  mkdir_p (Filename.dirname path);
  let output = open_out path in
  Fun.protect
    ~finally:(fun () -> close_out output)
    (fun () -> output_string output contents)

let copy_file src dst =
  mkdir_p (Filename.dirname dst);
  let ic = open_in_bin src in
  let oc = open_out_bin dst in
  let buffer = Bytes.create 16384 in
  Fun.protect
    ~finally:(fun () ->
      close_in_noerr ic;
      close_out_noerr oc)
    (fun () ->
      let rec loop () =
        let read = input ic buffer 0 (Bytes.length buffer) in
        if read > 0 then (
          output oc buffer 0 read;
          loop ())
      in
      loop ())

let rec copy_tree src dst =
  if Sys.file_exists src && Sys.is_directory src then (
    mkdir_p dst;
    Sys.readdir src
    |> Array.iter (fun name ->
           copy_tree (Filename.concat src name) (Filename.concat dst name)))
  else copy_file src dst

let html_escape text =
  let buffer = Buffer.create (String.length text) in
  String.iter
    (function
      | '&' -> Buffer.add_string buffer "&amp;"
      | '<' -> Buffer.add_string buffer "&lt;"
      | '>' -> Buffer.add_string buffer "&gt;"
      | '"' -> Buffer.add_string buffer "&quot;"
      | '\'' -> Buffer.add_string buffer "&#39;"
      | char -> Buffer.add_char buffer char)
    text;
  Buffer.contents buffer

let local_href locale href =
  match (locale, href) with
  | I18n.En, "/now.html" -> "/en/now.html"
  | I18n.Zh, "/now.html" -> "/zh/now.html"
  | _ -> href

let nav_html site locale =
  site |> list_field "nav"
  |> List.map (fun section ->
         let label =
           match field "section" section with
           | Some yaml -> I18n.string_of_yaml locale yaml
           | None -> ""
         in
         let links =
           section |> list_field "links"
           |> List.map (fun link ->
                  let label =
                    match field "label" link with
                    | Some yaml -> I18n.string_of_yaml locale yaml
                    | None -> ""
                  in
                  let href = local_href locale (string_field "href" link) in
                  Printf.sprintf "<a href=\"%s\" class=\"nav-link\">%s</a>"
                    (html_escape href) (html_escape label))
           |> String.concat "\n"
         in
         Printf.sprintf
           "<span class=\"nav-section-label\">%s</span>\n%s"
           (html_escape label) links)
  |> String.concat "\n"

let footer_html site =
  match field "footer" site with
  | Some footer ->
      let copyright = string_field "copyright" footer in
      let links =
        footer |> list_field "links"
        |> List.map (fun link ->
               Printf.sprintf "<a href=\"%s\">%s</a>"
                 (html_escape (string_field "href" link))
                 (html_escape (string_field "label" link)))
        |> String.concat " · "
      in
      if links = "" then html_escape copyright
      else Printf.sprintf "%s<br>%s" (html_escape copyright) links
  | None -> ""

let contact site key =
  match field "contact" site with
  | Some contact -> string_field key contact
  | None -> ""

let language_switch_html current target =
  Printf.sprintf
    "<a class=\"language-switch\" href=\"%s\" title=\"Switch language\">%s</a>"
    (html_escape target)
    (html_escape (I18n.switch_label current))

let render_base ?(card_modifier = "") ?(is_home = false) ~site ~locale ~title
    ~switch_href content =
  Template.render "templates/base.html"
    [
      Template.str "lang" (I18n.html_lang locale);
      Template.str "title" title;
      Template.bool "is_home" is_home;
      Template.str "site_name" (string_field "name" site);
      Template.str "site_subtitle" "Mathematician";
      Template.safe "language_switch_html"
        (match switch_href with
        | Some href -> language_switch_html locale href
        | None -> "<div class=\"dark-toggle\" title=\"Toggle dark mode\">☾</div>");
      Template.safe "nav_html" (nav_html site locale);
      Template.safe "footer_html" (footer_html site);
      Template.str "card_modifier" card_modifier;
      Template.safe "content" content;
    ]

let render_home locale =
  let site = read_yaml "data/site.yaml" in
  let home = read_yaml "data/home.yaml" in
  let bio =
    match field "bio" home with
    | Some yaml -> I18n.string_of_yaml locale yaml
    | None -> ""
  in
  let content =
    Template.render "templates/home.html"
      [
        Template.str "welcome" (if locale = I18n.En then "Welcome" else "你好");
        Template.safe "headline"
          (if locale = I18n.En then
             "<strong>Hi, I'm Patrick.</strong><br>I do mathematics."
           else "<strong>你好，我是 Patrick。</strong><br>我做数学。");
        Template.str "bio" bio;
        Template.str "contact_title"
          (if locale = I18n.En then "Contact" else "联系");
        Template.str "email" (contact site "email");
        Template.str "github" (contact site "github");
      Template.str "arxiv" (contact site "arxiv");
      ]
  in
  let switch_href = if locale = I18n.En then "/zh/" else "/en/" in
  let html =
    render_base ~is_home:true ~site ~locale ~title:"Patrick Lei"
      ~switch_href:(Some switch_href) content
  in
  match locale with
  | I18n.En -> write_file "public/en/index.html" html
  | I18n.Zh -> write_file "public/zh/index.html" html

let yaml_string_list = function
  | `A values ->
      values
      |> List.filter_map (function `String value -> Some value | _ -> None)
      |> List.map (fun value -> Jingoo.Jg_types.Tstr value)
  | _ -> []

let render_notes () =
  let site = read_yaml "data/site.yaml" in
  let notes =
    match read_yaml "data/notes.yaml" with
    | `A values ->
        values
        |> List.map (fun note ->
               Template.obj
                 [
                   ("name", Jingoo.Jg_types.Tstr (string_field "name" note));
                   ( "description",
                     Jingoo.Jg_types.Tstr (string_field "description" note) );
                   ("date", Jingoo.Jg_types.Tstr (string_field "date" note));
                   ("place", Jingoo.Jg_types.Tstr (string_field "place" note));
                   ("url", Jingoo.Jg_types.Tstr (string_field "url" note));
                 ])
    | _ -> []
  in
  let content =
    Template.render "templates/notes.html" [ Template.list "notes" notes ]
  in
  let html =
    render_base ~card_modifier:"wide-card" ~site ~locale:I18n.En
      ~title:"Patrick Lei | Notes" ~switch_href:None content
  in
  write_file "public/notes.html" html

let render_papers () =
  let site = read_yaml "data/site.yaml" in
  let papers =
    match read_yaml "data/papers.yaml" with
    | `A values ->
        values
        |> List.map (fun paper ->
               let pages =
                 match int_field "pages" paper with
                 | Some value -> Jingoo.Jg_types.Tint value
                 | None -> Jingoo.Jg_types.Tnull
               in
               let categories =
                 match field "categories" paper with
                 | Some yaml -> yaml_string_list yaml
                 | None -> []
               in
               Template.obj
                 [
                   ("title", Jingoo.Jg_types.Tstr (string_field "title" paper));
                   ("date", Jingoo.Jg_types.Tstr (string_field "date" paper));
                   ("arxiv", Jingoo.Jg_types.Tstr (string_field "arxiv" paper));
                   ("pages", pages);
                   ("categories", Jingoo.Jg_types.Tlist categories);
                 ])
    | _ -> []
  in
  let content =
    Template.render "templates/papers.html" [ Template.list "papers" papers ]
  in
  let html =
    render_base ~card_modifier:"wide-card" ~site ~locale:I18n.En
      ~title:"Patrick Lei | Papers" ~switch_href:None content
  in
  write_file "public/papers.html" html

let render_now locale =
  let site = read_yaml "data/site.yaml" in
  let home = read_yaml "data/home.yaml" in
  let now_items =
    match field "now" home with
    | Some yaml -> I18n.strings_of_yaml locale yaml
    | None -> []
  in
  let content =
    Template.render "templates/now.html"
      [
        Template.str "label" (if locale = I18n.En then "Now" else "最近");
        Template.safe "headline"
          (if locale = I18n.En then "<strong>Now.</strong><br>What I am doing."
           else "<strong>最近。</strong><br>我在忙什么。");
        Template.str "intro"
          (if locale = I18n.En then "A short status page in the spirit of "
           else "一个简短的近况页面，参考 ");
        Template.str "whats_that" (if locale = I18n.En then "nownownow.com." else "nownownow.com。");
        Template.str "section_title" (if locale = I18n.En then "Currently" else "最近");
        Template.list "items"
          (List.map (fun item -> Jingoo.Jg_types.Tstr item) now_items);
      ]
  in
  let switch_href = if locale = I18n.En then "/zh/now.html" else "/en/now.html" in
  let html =
    render_base ~site ~locale ~title:"Patrick Lei | Now"
      ~switch_href:(Some switch_href) content
  in
  match locale with
  | I18n.En -> write_file "public/en/now.html" html
  | I18n.Zh -> write_file "public/zh/now.html" html

let render_travel () =
  let site = read_yaml "data/site.yaml" in
  let content = Template.render "templates/travel.html" [] in
  let html =
    render_base ~card_modifier:"wide-card" ~site ~locale:I18n.En
      ~title:"Patrick Lei | Travel" ~switch_href:None content
  in
  write_file "public/travel.html" html

let starts_with text prefix =
  let text_len = String.length text and prefix_len = String.length prefix in
  text_len >= prefix_len && String.sub text 0 prefix_len = prefix

let find_sub text sub start =
  let text_len = String.length text and sub_len = String.length sub in
  let rec loop index =
    if index + sub_len > text_len then None
    else if String.sub text index sub_len = sub then Some index
    else loop (index + 1)
  in
  loop start

let markdown_with_frontmatter path =
  let raw = read_file path in
  if starts_with raw "---\n" then
    match find_sub raw "\n---\n" 4 with
    | Some index ->
        let frontmatter = String.sub raw 4 (index - 4) |> Yaml.of_string_exn in
        let body_start = index + 5 in
        let body = String.sub raw body_start (String.length raw - body_start) in
        (frontmatter, body)
    | None -> (`O [], raw)
  else (`O [], raw)

type seminar = {
  slug : string;
  title : string;
  date : string;
  description : string;
  markdown : string;
}

let slug_of_markdown_filename filename =
  String.sub filename 0 (String.length filename - String.length ".md")

let seminar_files () =
  Sys.readdir "data/seminars"
  |> Array.to_list
  |> List.filter (fun filename -> Filename.check_suffix filename ".md")
  |> List.sort String.compare

let read_seminar filename =
  let slug = slug_of_markdown_filename filename in
  let frontmatter, markdown =
    markdown_with_frontmatter (Filename.concat "data/seminars" filename)
  in
  {
    slug;
    title = string_field "title" frontmatter;
    date = string_field "pubDate" frontmatter;
    description = string_field "description" frontmatter;
    markdown;
  }

let seminars () =
  seminar_files ()
  |> List.map read_seminar
  |> List.sort (fun left right -> compare right.date left.date)

let seminar_obj seminar =
  Template.obj
    [
      ("title", Jingoo.Jg_types.Tstr seminar.title);
      ("date", Jingoo.Jg_types.Tstr seminar.date);
      ("slug", Jingoo.Jg_types.Tstr seminar.slug);
      ("description", Jingoo.Jg_types.Tstr seminar.description);
    ]

let render_seminar_index () =
  let site = read_yaml "data/site.yaml" in
  let content =
    Template.render "templates/seminar-index.html"
      [ Template.list "seminars" (seminars () |> List.map seminar_obj) ]
  in
  let html =
    render_base ~site ~locale:I18n.En ~title:"Patrick Lei | Seminars"
      ~switch_href:None content
  in
  write_file "public/seminars/index.html" html

let find_seminar slug =
  seminars () |> List.find (fun seminar -> seminar.slug = slug)

let render_seminar_page slug =
  let site = read_yaml "data/site.yaml" in
  let seminar = find_seminar slug in
  let body = Markdown.to_html seminar.markdown in
  let content =
    Template.render "templates/seminar-page.html"
      [
        Template.str "title" seminar.title;
        Template.str "date" seminar.date;
        Template.str "description" seminar.description;
        Template.safe "body" body;
      ]
  in
  let html =
    render_base ~site ~locale:I18n.En ~title:seminar.title ~switch_href:None
      content
  in
  write_file ("public/seminars/" ^ slug ^ "/index.html") html

let copy_static () =
  if Sys.file_exists "static" then copy_tree "static" "public" else ()

let render_root_redirect () =
  write_file "public/index.html"
    {|<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Patrick Lei</title>
  <script>
    const target = navigator.language && navigator.language.toLowerCase().startsWith('zh') ? '/zh/' : '/en/';
    window.location.replace(target);
  </script>
  <meta http-equiv="refresh" content="0; url=/en/">
</head>
<body>
  <p><a href="/en/">Continue to the English site</a> · <a href="/zh/">中文</a></p>
</body>
</html>|}

let render = function
  | Home locale -> render_home locale
  | Notes -> render_notes ()
  | Papers -> render_papers ()
  | Travel -> render_travel ()
  | SeminarIndex -> render_seminar_index ()
  | SeminarPage slug -> render_seminar_page slug
  | Now locale -> render_now locale

let render_all () =
  render (Home I18n.En);
  render (Home I18n.Zh);
  render Notes;
  render Papers;
  render Travel;
  render (Now I18n.En);
  render (Now I18n.Zh);
  render SeminarIndex;
  seminars () |> List.iter (fun seminar -> render (SeminarPage seminar.slug));
  copy_static ();
  render_root_redirect ()
