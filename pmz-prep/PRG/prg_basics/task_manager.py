# task = input("Úkol: ")

# print(f"Úkol byl úspěšně přidán. \nÚkol: {task}")

tasks = []


def add_task(task):
    tasks.append({
        "task": task,
        "done": False
    })


def mark_task(task):
    for x in tasks:
        if x["task"] == task:
            x["done"] = True
            break


def get_all_tasks():
    for task in tasks:
        if task["done"]:
            print(f"Úkol: {task['task']}, stav: ✔️")
        else:
            print(f"Úkol: {task['task']}, stav: ✖️")


add_task("Vynést koš")
add_task("Udělat úkol z matematiky")
add_task("Jít ven")

get_all_tasks()

mark_task("Vynést koš")
mark_task("Jít ven")

get_all_tasks()
