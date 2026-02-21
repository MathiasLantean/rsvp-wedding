from unittest.mock import patch

def test_guest_download(client):
    mocked_guests = [
        {
            "phone": "1234567890",
            "message": "Can't wait!",
            "guests": [
                {"name": "John Doe", "attending": True, "notes": "Vegetarian"},
                {"name": "Jane Second", "attending": False, "notes": None},
                {"name": "Baby Doe", "attending": None, "notes": None},
            ]
        },
        {
            "phone": "0987654321",
            "message": None,
            "guests": [
                {"name": "Alice Smith", "attending": True, "notes": None}
            ]
        }
    ]

    with patch("app.main.crud.list_guests", return_value=mocked_guests):
        response = client.get("/guests/download")
        
        assert response.status_code == 200
        assert response.headers["content-type"] == "text/csv; charset=utf-8"
        assert response.headers["content-disposition"] == "attachment; filename=guests.csv"
        
        content = response.content.decode("utf-8")
        lines = [line.strip() for line in content.splitlines() if line.strip()]
        
        assert len(lines) == 5
        assert lines[0] == "Name,Attending,Notes,Message,Phone"
        assert lines[1] == "John Doe,Yes,Vegetarian,Can't wait!,1234567890"
        assert lines[2] == "Jane Second,No,,,"
        assert lines[3] == "Baby Doe,Pending,,,"
        assert lines[4] == "Alice Smith,Yes,,,0987654321"
