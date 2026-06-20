type page =
  | Home of I18n.locale
  | Notes
  | Papers
  | SeminarIndex
  | SeminarPage of string
  | Now of I18n.locale

let read_yaml path = Yaml_unix.of_file_exn (Fpath.v path)

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

let render_base ~site ~locale ~title ~switch_href content =
  Template.render "templates/base.html"
    [
      Template.str "lang" (I18n.html_lang locale);
      Template.str "title" title;
      Template.str "site_name" (string_field "name" site);
      Template.str "site_subtitle" "Mathematician";
      Template.safe "language_switch_html"
        (match switch_href with
        | Some href -> language_switch_html locale href
        | None -> "<div class=\"dark-toggle\" title=\"Toggle dark mode\">☾</div>");
      Template.safe "nav_html" (nav_html site locale);
      Template.safe "footer_html" (footer_html site);
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
  let now_items =
    match field "now" home with
    | Some yaml -> I18n.strings_of_yaml locale yaml
    | None -> []
  in
  let now_values =
    now_items
    |> List.map (fun item -> Jingoo.Jg_types.Tstr item)
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
        Template.str "now_title" (if locale = I18n.En then "Now" else "最近");
        Template.str "now_more" (if locale = I18n.En then "More →" else "更多 →");
        Template.str "now_href"
          (if locale = I18n.En then "/en/now.html" else "/zh/now.html");
        Template.list "now_items" now_values;
        Template.str "contact_title"
          (if locale = I18n.En then "Contact" else "联系");
        Template.str "email" (contact site "email");
        Template.str "github" (contact site "github");
        Template.str "arxiv" (contact site "arxiv");
      ]
  in
  let switch_href = if locale = I18n.En then "/zh/" else "/en/" in
  let html =
    render_base ~site ~locale ~title:"Patrick Lei" ~switch_href:(Some switch_href)
      content
  in
  match locale with
  | I18n.En -> write_file "public/en/index.html" html
  | I18n.Zh -> write_file "public/zh/index.html" html

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
  | Notes -> failwith "Notes page is implemented in Phase 3"
  | Papers -> failwith "Papers page is implemented in Phase 3"
  | SeminarIndex -> failwith "Seminar index is implemented in Phase 4"
  | SeminarPage slug -> failwith ("Seminar page is implemented in Phase 4: " ^ slug)
  | Now _ -> failwith "Now page is implemented in Phase 4"

let render_all () =
  render (Home I18n.En);
  render (Home I18n.Zh);
  render_root_redirect ()
