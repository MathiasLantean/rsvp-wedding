import uuid

def test_list_guests_prod(client, cleanup_guest):
    phone_1 = f"test-{uuid.uuid4()}"
    phone_2 = f"test-{uuid.uuid4()}"

    payload_1 = {
        "phone": phone_1,
        "name": "Test Guest One",
        "invited_total": 2,
    }

    payload_2 = {
        "phone": phone_2,
        "name": "Test Guest Two",
        "invited_total": 3,
    }

    r1 = client.post("/guests", json=payload_1)
    r2 = client.post("/guests", json=payload_2)

    assert r1.status_code == 200
    assert r2.status_code == 200

    cleanup_guest.extend([phone_1, phone_2])

    response = client.get("/guests")

    assert response.status_code == 200

    guests = response.json()
    assert isinstance(guests, list)

    phones = {g["phone"] for g in guests}

    assert phone_1 in phones
    assert phone_2 in phones