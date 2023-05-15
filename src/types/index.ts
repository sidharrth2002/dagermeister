import { NodeProps } from "react-flow-renderer";

export interface NodePropsExtended extends NodeProps {
  params: any;
}

export enum InputTypes {
  text = "text",
  number = "number",
  select = "select",
  checkbox = "checkbox",
  date = "date",
  time = "time",
  datetime = "datetime",
  textarea = "textarea",
  code = "code",
  json = "json",
  file = "file",
  color = "color",
  password = "password",
  email = "email",
  url = "url",
  tel = "tel",
  hidden = "hidden",
  radio = "radio",
  range = "range",
  search = "search",
  month = "month",
  week = "week",
  datetimeLocal = "datetime-local",
}

export interface NodeTypes {
  [key: string]: any;
}
