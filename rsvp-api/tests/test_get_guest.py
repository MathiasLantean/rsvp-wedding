import uuid

def test_get_guest_prod(client, cleanup_guest):
    phone_1 = f"test-{uuid.uuid4()}"

    payload_1 = {
        "phone": phone_1,
        "guest_names": ["Mathias Lantean", "Carolina Reolon"],
    }

    r1 = client.post("/guests", json=payload_1)

    assert r1.status_code == 200

    cleanup_guest.append(phone_1)

    response = client.get(f"/rsvp/{phone_1}")

    assert response.status_code == 200

    guest = response.json()

    assert phone_1 in guest.get("phone")
