type locale = En | Zh

let code = function En -> "en" | Zh -> "zh"
let html_lang = function En -> "en" | Zh -> "zh-CN"
let switch_label = function En -> "中文" | Zh -> "EN"
let other = function En -> Zh | Zh -> En

let string_of_yaml locale = function
  | `O fields -> (
      match List.assoc_opt (code locale) fields with
      | Some (`String value) -> value
      | _ -> "")
  | _ -> ""

let strings_of_yaml locale = function
  | `O fields -> (
      match List.assoc_opt (code locale) fields with
      | Some (`A items) ->
          List.filter_map
            (function `String value -> Some value | _ -> None)
            items
      | _ -> [])
  | _ -> []
