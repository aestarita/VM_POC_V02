import { bootstrapCameraKit, Transform2D } from "@snap/camera-kit";
import { createMediaStreamSource } from "@snap/camera-kit";
DEFAULT_GROUP_KEY = "e90568ce-829a-46e2-ae25-111bec3554f8";
JSON_WEB_TOKEN = "eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNjg2MjM5NTM2LCJzdWIiOiJjYmEzODBiMS0yZTA1LTRjYTktYmMyMy04MDZiYTAwZGM0YWZ-U1RBR0lOR35mZDljMDRmMi1lMTUxLTQ3NDEtODE2MC0zMGQxOGU5YzE5ZDEifQ.mLtdpB2LY9VJ-ucxQB5CK-Gq3ChHnod6yDqGDZF-YY8";

(async function main() {
    const apiToken = "eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNjg2MjM5NTM2LCJzdWIiOiJjYmEzODBiMS0yZTA1LTRjYTktYmMyMy04MDZiYTAwZGM0YWZ-U1RBR0lOR35mZDljMDRmMi1lMTUxLTQ3NDEtODE2MC0zMGQxOGU5YzE5ZDEifQ.mLtdpB2LY9VJ-ucxQB5CK-Gq3ChHnod6yDqGDZF-YY8";
    const cameraKit = await bootstrapCameraKit({ apiToken });

    const session = await cameraKit.createSession();
    const canvas = document.getElementById("my-canvas").replaceWith(session.output.live);

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const source = createMediaStreamSource(stream, {
        transform: Transform2D.MirrorX,
        cameraType: "back",
    });
    session.setSource(source);


    //Use comented Below to apply single Lens: First Lens ID, Then Lens Group ID
    const lens = await cameraKit.lensRepository.loadLens("1f440ac2-75ec-444b-80bc-53250b3c5355", "e90568ce-829a-46e2-ae25-111bec3554f8");
    await session.applyLens(lens);

    await session.play("live");
    console.log("Lens rendering has started!");
})();

console.log("Little Test 1");

