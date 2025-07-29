import csv
import random
import os
from datetime import datetime, timedelta

cwd = os.path.dirname(__file__)

# Convert maintenance-Aircraft.csv from semicolon to comma temporarily for processing
with open(os.path.join(cwd, "maintenance-Aircraft.csv"), 'r', newline='') as file:
    lines = file.readlines()

with open(os.path.join(cwd, "maintenance-Aircraft.csv"), 'w', newline='') as file:
    for line in lines:
        file.write(line.replace(";", ","))

# Read existing aircraft data to get tail numbers
with open(os.path.join(cwd, "maintenance-Aircraft.csv"), 'r', newline='') as file:
    reader = csv.DictReader(file)
    rows = list(reader)

# Update existing data to match controller expectations
updated_rows = []
for row in rows:
    # Ensure all required fields are present
    tail_number = row.get('tailNumber', '')
    
    # Generate realistic failure history for some aircraft (as JSON string)
    failure_types = ['Engine', 'Hydraulic', 'Landing Gear', 'Brake System', 'Avionics', 'Fuel System', 'Electrical']
    severities = ['minor', 'major', 'critical']
    
    # 40% chance of having failure history
    if random.choice([True, False, False, True, False]):
        num_failures = random.randint(1, 4)
        failure_history = []
        
        for i in range(num_failures):
            failure_date = datetime.now() - timedelta(days=random.randint(30, 730))
            failure_history.append({
                "date": failure_date.strftime('%Y-%m-%d'),
                "type": random.choice(failure_types),
                "severity": random.choice(severities)
            })
        
        # Sort by date (newest first)
        failure_history.sort(key=lambda x: x['date'], reverse=True)
        
        # Set last failure info from most recent failure
        if failure_history:
            row['lastFailureDate'] = failure_history[0]['date']
            row['lastFailureType'] = failure_history[0]['type']
        
        # Convert to JSON string for failureHistory field
        import json
        row['failureHistory'] = json.dumps(failure_history)
    else:
        row['lastFailureDate'] = ''
        row['lastFailureType'] = ''
        row['failureHistory'] = '[]'
    
    # Add overallStatus field based on alertStatus
    alert_status = row.get('alertStatus', 'Normal')
    if alert_status == 'Critical':
        row['overallStatus'] = 'critical'
    elif alert_status == 'Warning':
        row['overallStatus'] = 'warning'
    else:
        row['overallStatus'] = 'normal'
    
    # Generate predictiveFlags based on sensor values
    vibration = float(row.get('vibrationLevel', 0))
    flight_hours = int(row.get('flightHoursSinceLastMaintenance', 0))
    brake_wear = float(row.get('brakeWearPercent', 0))
    oil_particles = int(row.get('oilParticleCount', 0))
    engine_temp = float(row.get('engineTemperature', 0))
    
    predictive_flags = []
    
    # High vibration + high flight hours -> critical failure risk
    if vibration > 2.0 and flight_hours > 800:
        predictive_flags.append({
            "type": "critical",
            "message": "High failure probability (75%) - Vibration + Flight Hours",
            "priority": "immediate"
        })
    
    # Oil contamination
    if oil_particles > 1000:
        predictive_flags.append({
            "type": "warning", 
            "message": "Maintenance alert - Oil contamination detected",
            "priority": "high"
        })
    
    # Critical brake wear
    if brake_wear > 85:
        predictive_flags.append({
            "type": "critical",
            "message": "Critical brake wear - Immediate replacement required", 
            "priority": "immediate"
        })
    
    # High vibration alone
    if vibration > 2.0:
        predictive_flags.append({
            "type": "warning",
            "message": "Elevated vibration levels detected",
            "priority": "medium"
        })
    
    # High engine temperature
    if engine_temp > 520:
        predictive_flags.append({
            "type": "warning",
            "message": "Engine temperature above normal range",
            "priority": "high"
        })
    
    import json
    row['predictiveFlags'] = json.dumps(predictive_flags)
    
    updated_rows.append(row)

# Write back the updated data
with open(os.path.join(cwd, "maintenance-Aircraft.csv"), 'w', newline='') as file:
    if updated_rows:
        fieldnames = list(updated_rows[0].keys())
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(updated_rows)

# Convert back to semicolon format
with open(os.path.join(cwd, "maintenance-Aircraft.csv"), 'r', newline='') as file:
    lines = file.readlines()

with open(os.path.join(cwd, "maintenance-Aircraft.csv"), 'w', newline='') as file:
    for line in lines:
        file.write(line.replace(",", ";"))