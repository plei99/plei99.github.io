type model = string * Jingoo.Jg_types.tvalue

let render path (models : model list) =
  Jingoo.Jg_template.from_file path ~models

let str key value = (key, Jingoo.Jg_types.Tstr value)
let safe key value = (key, Jingoo.Jg_types.Tsafe value)
let list key values = (key, Jingoo.Jg_types.Tlist values)
let obj fields = Jingoo.Jg_types.Tobj fields
let bool key value = (key, Jingoo.Jg_types.Tbool value)
