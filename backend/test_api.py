from gradio_client import Client

client = Client("yisol/IDM-VTON")

result = client.predict(
    dict={
        "background": "person.jpg",
        "layers": [],
        "composite": None,
    },
    garm_img="cloth.png",
    garment_des="blue shirt",
    is_checked=True,
    is_checked_crop=False,
    denoise_steps=30,
    seed=42,
    api_name="/tryon",
)

print(result)