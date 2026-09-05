import cv2
from ultralytics import YOLO

# Load YOLO model
model = YOLO("yolov8n.pt")

# Video path
video_path =r"c:15643210_3840_2160_25fps.mp4"
cap = cv2.VideoCapture(video_path)
# Stop line position
STOP_LINE_Y = 300

while True:
    ret, frame = cap.read()

    if not ret:
        break
    frame = cv2.resize(frame, (1280, 720))
    # Run YOLO detection
    results = model(frame)
    
    # Draw stop line
    cv2.line(frame, (0, STOP_LINE_Y), (frame.shape[1], STOP_LINE_Y), (0, 0, 255), 2)

    for result in results:
        boxes = result.boxes

        for box in boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            cls = int(box.cls[0])
            confidence = float(box.conf[0])

            label = model.names[cls]

            # Detect vehicles
            if label in ["car", "motorcycle", "bus", "truck"]:
                center_y = (y1 + y2) // 2

                # Draw rectangle
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(frame, label, (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

                # Violation detection
                if center_y > STOP_LINE_Y:
                    cv2.putText(frame,
                                "Traffic Violation Detected",
                                (50, 50),
                                cv2.FONT_HERSHEY_SIMPLEX,
                                1,
                                (0, 0, 255),
                                3)

    cv2.imshow("Traffic Violation Detection", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()