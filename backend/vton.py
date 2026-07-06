import shutil
import os

def run_tryon(person_path, cloth_path):
    os.makedirs("outputs", exist_ok=True)

    output_path = os.path.join(
        "outputs",
        f"result_{os.path.basename(person_path)}"
    )

    # Temporary demo: return the uploaded person image
    shutil.copy(person_path, output_path)

    return output_path