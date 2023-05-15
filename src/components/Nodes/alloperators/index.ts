// read all json files in src/airflow and create a dictionary of operators
const context = require.context('../../../airflow', true, /\.json$/);

const operators: any = {}

context.keys().forEach((key) => {
    const operator = context(key);
    operators[operator.name] = operator.params;
});

export default operators;

// const operators = {
//     PythonOperator: {
//         task_id: {
//             type: "text",
//             label: "Task ID",
//             placeholder: "Task ID",
//             required: true,
//         },
//         python_callable: {
//             type: "code",
//             label: "Python Callable",
//             placeholder: "def main():",
//             required: true,
//         },
//         op_kwargs: {
//             type: "json",
//             label: "Op Kwargs",
//             placeholder: "{}",
//             required: false,
//         }
//     },
//     BashOperator: {
//         task_id: {
//             type: "text",
//             label: "Task ID",
//             placeholder: "Task ID",
//             required: true,
//         },
//         bash_command: {
//             type: "text",
//             label: "Bash Command",
//             placeholder: "Bash Command",
//             required: true,
//         },
//         env: "",
//     },
//     EmailOperator: {
//         task_id: "",
//         to: "",
//         html_content: "",
//         files: "",
//         cc: "",
//         bcc: "",
//         mime_subtype: "",
//         mime_charset: "",
//         custom_headers: "",
//     },
//     HttpOperator: {
//         task_id: "",
//         endpoint: "",
//         data: "",
//         headers: "",
//         response_check: "",
//         extra_options: "",
//     },
//     MySqlOperator: {
//         task_id: "",
//         sql: "",
//         mysql_conn_id: "",
//         parameters: "",
//         autocommit: "",
//         database: "",
//     },
//     PostgresOperator: {
//         task_id: "",
//         sql: "",
//         postgres_conn_id: "",
//         parameters: "",
//         autocommit: "",
//         database: "",
//     },
//     SqliteOperator: {
//         task_id: "",
//         sql: "",
//         sqlite_conn_id: "",
//         parameters: "",
//         autocommit: "",
//         database: "",
//     },
//     OracleOperator: {
//         task_id: "",
//         sql: "",
//         oracle_conn_id: "",
//         parameters: "",
//         autocommit: "",
//         database: "",
//     },
// }