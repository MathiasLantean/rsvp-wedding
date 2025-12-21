import uuid

def test_create_guest_conflict_prod(client, cleanup_guest):
    phone = f"test-{uuid.uuid4()}"

    payload = {
        "phone": phone,
        "guest_names": ["Mathias Lantean", "Carolina Reolon"],
    }

    first = client.post("/guests", json=payload)
    assert first.status_code == 200

    cleanup_guest.append(phone)

    second = client.post("/guests", json=payload)
    assert second.status_code == 409