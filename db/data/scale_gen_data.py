import csv
import random
import os

cwd = os.path.dirname(__file__)

lines = []
field_names= ["tailNumber", "vibration_level", "flight_hours", "brake_wear", "oil_particle_count", "engine_temperature", "hydraulic_pressure", "weather_stress_index", "aircraft_age"]

with open(os.path.join(cwd, "maintenance-Aircraft.csv"), 'r', newline='') as file:
    lines = file.readlines()

with open(os.path.join(cwd, "maintenance-Aircraft.csv"), 'w', newline='') as file:
    for line in lines:
        file.write(line.replace(";", ","))

with open(os.path.join(cwd, "maintenance-Aircraft.csv"), 'r', newline='') as file:
    reader = csv.DictReader(file)
    tail_numbers = [row["tailNumber"] for row in reader]
    with open(os.path.join(cwd, "flight_data.csv"), "w", newline='') as output:
        writer = csv.DictWriter(output, fieldnames=field_names)
        writer.writeheader()
        for num in tail_numbers:
            faulty = random.choice([True, False])
            if faulty:
                writer.writerow({
                    "tailNumber": str(num),
                    "vibration_level": round(random.uniform(0.20, 0.50), 2),
                    "flight_hours": random.choice(range(10000, 16000)),
                    "brake_wear": round(random.uniform(70, 86), 2),
                    "oil_particle_count": random.choice(range(10000, 20000)),
                    "engine_temperature": round(random.uniform(900, 1200), 2),
                    "hydraulic_pressure": round(random.uniform(2000, 2499), 2),
                    "weather_stress_index": round(random.uniform(0.7, 1.0), 2),
                    "aircraft_age": random.choice(range(25, 30))
                })
            else:
                writer.writerow({
                    "tailNumber": str(num),
                    "vibration_level": round(random.uniform(0.05, 0.15), 2),
                    "flight_hours": random.choice(range(3000, 6000)),
                    "brake_wear": round(random.uniform(0, 20), 2),
                    "oil_particle_count": random.choice(range(640, 2500)),
                    "engine_temperature": round(random.uniform(500, 650), 2),
                    "hydraulic_pressure": round(random.uniform(2800, 3200), 2),
                    "weather_stress_index": round(random.uniform(0.0, 0.3), 2),
                    "aircraft_age": random.choice(range(0, 10))
                })

with open(os.path.join(cwd, "flight_data.csv"), 'r', newline='') as file:
    lines = file.readlines()

with open(os.path.join(cwd, "flight_data.csv"), 'w', newline='') as file:
    for line in lines:
        file.write(line.replace(",", ";"))

with open(os.path.join(cwd, "maintenance-Aircraft.csv"), 'r', newline='') as file:
    lines = file.readlines()

with open(os.path.join(cwd, "maintenance-Aircraft.csv"), 'w', newline='') as file:
    for line in lines:
        file.write(line.replace(",", ";"))