import csv
import random

lines = []
field_names= ["tailNumber", "HDS", "MTSR", "AED", "faulty"]

with open("maintenance-Aircraft.csv", 'r', newline='') as file:
    lines = file.readlines()

with open("maintenance-Aircraft.csv", 'w', newline='') as file:
    for line in lines:
        file.write(line.replace(";", ","))

with open("maintenance-Aircraft.csv", 'r', newline='') as file:
    reader = csv.DictReader(file)
    tail_numbers = [row["tailNumber"] for row in reader]
    with open("flight_data.csv", "w", newline='') as output:
        writer = csv.DictWriter(output, fieldnames=field_names)
        writer.writeheader()
        for num in tail_numbers:
            faulty = random.choice([True, False])
            for i in range(2):
                if faulty:
                    writer.writerow({
                        "tailNumber": str(num),
                        "HDS": round(random.uniform(60, 100), 2),
                        "MTSR": random.choice(range(150, 300)),
                        "AED": round(random.uniform(0.5, 2.00), 2),
                        "faulty": "True"
                    })
                else:
                    writer.writerow({
                        "tailNumber": str(num),
                        "HDS": round(random.uniform(0, 30), 2),
                        "MTSR": random.choice(range(50)),
                        "AED": round(random.uniform(0, 0.10), 2),
                        "faulty": "False"
                    })

with open("flight_data.csv", 'r', newline='') as file:
    lines = file.readlines()

with open("flight_data.csv", 'w', newline='') as file:
    for line in lines:
        file.write(line.replace(",", ";"))

with open("maintenance-Aircraft.csv", 'r', newline='') as file:
    lines = file.readlines()

with open("maintenance-Aircraft.csv", 'w', newline='') as file:
    for line in lines:
        file.write(line.replace(",", ";"))