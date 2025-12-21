import uuid


def test_confirm_attendance_success_prod(client, cleanup_guest):
    phone = f"test-{uuid.uuid4()}"

    create_payload = {
        "phone": phone,
        "guest_names": ["Juan", "Maria"],
    }

    create = client.post("/guests", json=create_payload)
    assert create.status_code == 200

    cleanup_guest.append(phone)

    confirm_payload = {
        "phone": phone,
        "guests": [
            {"name": "Juan", "attending": True, "notes": "Arriving early"},
            {"name": "Maria", "attending": False, "notes": None},
        ],
        "message": "We are going together",
    }

    response = client.post("/rsvp/confirm", json=confirm_payload)

    assert response.status_code == 200

    body = response.json()
    assert body["phone"] == phone
    assert body["message"] == "We are going together"

    assert len(body["guests"]) == 2

    juan = next(g for g in body["guests"] if g["name"] == "Juan")
    maria = next(g for g in body["guests"] if g["name"] == "Maria")

    assert juan["attending"] is True
    assert juan["notes"] == "Arriving early"

    assert maria["attending"] is False
    assert maria["notes"] is None


def test_confirm_attendance_guest_list_mismatch_prod(client, cleanup_guest):
    phone = f"test-{uuid.uuid4()}"

    create_payload = {
        "phone": phone,
        "guest_names": ["Juan", "Maria"],
    }

    create = client.post("/guests", json=create_payload)
    assert create.status_code == 200

    cleanup_guest.append(phone)

    confirm_payload = {
        "phone": phone,
        "guests": [
            {"name": "Juan", "attending": True},
            {"name": "Pedro", "attending": True},  # It doesn't exist
        ],
    }

    response = client.post("/rsvp/confirm", json=confirm_payload)

    assert response.status_code == 400
    assert response.json()["detail"] == "Guest list does not match existing group"