from gradio_client import Client
import shutil
import os

client = Client("yisol/IDM-VTON")



def run_tryon(person_path, cloth_path):
    result = client.predict(
        dict={
            "background": person_path,
            "layers": [],
            "composite": None,
        },
        garm_img=cloth_path,
        garment_des="blue shirt",
        is_checked=True,
        is_checked_crop=False,
        denoise_steps=30,
        seed=42,
        api_name="/tryon",
    )
        

    os.makedirs("outputs", exist_ok=True)

    # Temporarily assume first item is the output
    output_file = result[0]

    output_path = os.path.join(
        "outputs",
        f"result_{os.path.basename(person_path)}"
    )

    shutil.copy(output_file, output_path)

    return output_path