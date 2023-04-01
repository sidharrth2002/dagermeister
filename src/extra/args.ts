const args = {
    "BashOperator": {
        "task_id": "string",
        "bash_command": "string",
        "env": "string",
    },
    "Email": {
        "task_id": "string",
        "to": "string",
        "html_content": "string",
        "files": "string",
        "cc": "string",
        "bcc": "string",
        "mime_subtype": "string",
        "mime_charset": "string",
        "custom_headers": "string",
    },
    "PythonOperator": {
        "task_id": "string",
        "python_callable": "def main():",
        "op_kwargs": "string",
    }
}

export default args