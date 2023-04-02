'''
example_dag1:
  default_args:
    owner: 'example_owner'
    start_date: 2018-01-01  # or '2 days'
    end_date: 2018-01-05
    retries: 1
    retry_delay_sec: 300
  schedule_interval: '0 3 * * *'
  concurrency: 1
  max_active_runs: 1
  dagrun_timeout_sec: 60
  default_view: 'tree'  # or 'graph', 'duration', 'gantt', 'landing_times'
  orientation: 'LR'  # or 'TB', 'RL', 'BT'
  description: 'this is an example dag!'
  on_success_callback_name: print_hello
  on_success_callback_file: /usr/local/airflow/dags/print_hello.py
  on_failure_callback_name: print_hello
  on_failure_callback_file: /usr/local/airflow/dags/print_hello.py
  tasks:
    task_1:
      operator: airflow.operators.bash_operator.BashOperator
      bash_command: 'echo 1'
    task_2:
      operator: airflow.operators.bash_operator.BashOperator
      bash_command: 'echo 2'
      dependencies: [task_1]
    task_3:
      operator: airflow.operators.bash_operator.BashOperator
      bash_command: 'echo 3'
      dependencies: [task_1]
'''

'''
data format:
{
  "nodes": [
    {
      "width": 150,
      "height": 40,
      "id": "1",
      "type": "input",
      "data": {
        "label": "Start"
      },
      "position": {
        "x": 250,
        "y": 5
      },
      "selected": false,
      "positionAbsolute": {
        "x": 250,
        "y": 5
      }
    },
    {
      "width": 92,
      "height": 55,
      "id": "2",
      "type": "BashOperator",
      "data": {
        "id": "2",
        "label": "Bash Operator"
      },
      "position": {
        "x": 100,
        "y": 100
      },
      "positionAbsolute": {
        "x": 100,
        "y": 100
      }
    },
    {
      "width": 133,
      "height": 52,
      "id": "3",
      "type": "DummyOperator",
      "data": {
        "label": "Dummy Operator"
      },
      "position": {
        "x": 400,
        "y": 100
      },
      "positionAbsolute": {
        "x": 400,
        "y": 100
      }
    },
    {
      "width": 116,
      "height": 40,
      "id": "4",
      "type": "PythonOperator",
      "data": {
        "label": "Python Operator"
      },
      "position": {
        "x": 400,
        "y": 200
      },
      "positionAbsolute": {
        "x": 400,
        "y": 200
      }
    }
  ],
  "edges": [
    {
      "animated": true,
      "id": "e1-2",
      "source": "1",
      "target": "2"
    },
    {
      "animated": true,
      "id": "e1-3",
      "source": "1",
      "target": "3"
    }
  ],
  "viewport": {
    "x": 79,
    "y": 121,
    "zoom": 2
  }
}
'''




import logging
import subprocess
from jinja2 import Template
import yaml
def create_from_json(data):
    object = {
        'dag': {
            'default_args': {
                'owner': 'example_owner',
                'start_date': '2018-01-01',
                'end_date': '2018-01-05',
                'retries': 1,
                'retry_delay_sec': 300
            },
            'schedule_interval': '0 3 * * *',
            'concurrency': 1,
            'max_active_runs': 1,
            'dagrun_timeout_sec': 60,
            'default_view': 'tree',
            'orientation': 'LR',
            'description': data['description'],
            'tasks': {}
        }
    }
    for node in data['nodes']:
        if node['type'] == 'input':
            continue
        object['dag']['tasks'][node['id']] = {
            'operator': node['type'],
            'dependencies': []
        }
        # add missing attributes from params to object['dag']['tasks'][node['id']]
        if 'params' in node['data']:
            params = node['data']['params']
            for key, value in params.items():
                object['dag']['tasks'][node['id']][key] = value

    for edge in data['edges']:
        object['dag']['tasks'][edge['target']
                               ]['dependencies'].append(edge['source'])
    return object


def write_yaml_file(data, file_path):
    with open(file_path, 'w') as outfile:
        yaml.dump(data, outfile, default_flow_style=False)


def generate_python_file(data):
    # use jinja2 template to generate python file
    # pass data to template
    injection = {
        'config': f'configuration = {data}'
    }
    tmp_path = '/Users/SidharrthNagappan/Documents/Programming Stuff/projects/powerdag/ui/powerdag_api/app/templates/dagfile.py.j2'
    with open(tmp_path, 'r') as f:
        template = Template(f.read())

    # write to file
    with open('mydag.py', 'w') as f:
        f.write(template.render(injection))
        # use black to format the file
        logging.info('formatting file')
        subprocess.run(['black', 'mydag.py'])

    # return the file path
    return 'mydag.py'


if __name__ == '__main__':
    sample_data = {
        "description": "this is an example dag!",
        "nodes": [
            {
                "width": 150,
                "height": 40,
                "id": "1",
                "type": "input",
                "data": {
                    "label": "Start",
                },
                "position": {
                    "x": 253.16227426987223,
                    "y": -28.73092554530361
                },
                "selected": True,
                "positionAbsolute": {
                    "x": 253.16227426987223,
                    "y": -28.73092554530361
                },
                "dragging": False
            },
            {
                "width": 92,
                "height": 55,
                "id": "2",
                "type": "BashOperator",
                "data": {
                    "id": "2",
                    "label": "Bash Operator",
                    "params": {
                        "param1": "sdfsd",
                        "param2": "sdfsdf"
                    }

                },
                "position": {
                    "x": 100,
                    "y": 100
                },
                "selected": False,
                "positionAbsolute": {
                    "x": 100,
                    "y": 100
                },
                "dragging": False
            },
            {
                "width": 133,
                "height": 52,
                "id": "3",
                "type": "DummyOperator",
                "data": {
                    "label": "Dummy Operator"
                },
                "position": {
                    "x": 400,
                    "y": 100
                },
                "positionAbsolute": {
                    "x": 400,
                    "y": 100
                }
            },
            {
                "width": 116,
                "height": 40,
                "id": "4",
                "type": "PythonOperator",
                "data": {
                    "label": "Python Operator"
                },
                "position": {
                    "x": 400,
                    "y": 200
                },
                "positionAbsolute": {
                    "x": 400,
                    "y": 200
                }
            }
        ],
        "edges": [
            {
                "animated": True,
                "id": "e1-2",
                "source": "1",
                "target": "2"
            },
            {
                "animated": True,
                "id": "e1-3",
                "source": "1",
                "target": "3"
            }
        ],
        "viewport": {
            "x": 113.50127195614976,
            "y": 137.35920979401683,
            "zoom": 1.897368630280908
        }
    }

    obj = create_from_json(sample_data)
    generate_python_file(obj)
