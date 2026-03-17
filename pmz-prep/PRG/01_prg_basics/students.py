students = [
    {"name": "Josef", "grades": [1, 2, 3]},
    {"name": "Antonín", "grades": [4, 5, 5]},
    {"name": "Karolína", "grades": [3, 2, 3]},
    {"name": "David", "grades": [1, 1, 1]},
]


def calculate_avg(grades):
    if not grades:
        return 0
    return sum(grades) / len(grades)


def get_student_results():
    passing_limit = 4.20
    for student in students:
        avg = calculate_avg(student["grades"])

        if avg <= passing_limit:
            print(
                f"{student['name']} prospěl/a, jeho/její průměr je: {avg:.2f}.")
        else:
            print(
                f"{student['name']} neprospěl/a, jeho/její průměr je: {avg:.2f}.")


def sort_students_by_average():
    students_avg = []

    for student in students:
        avg = calculate_avg(student["grades"])

        students_avg.append({
            "name": student["name"],
            "avg": f"{avg:.2f}"
        })

    students_avg.sort(key=lambda student: student["avg"])
    return students_avg


get_student_results()
print(sort_students_by_average())
