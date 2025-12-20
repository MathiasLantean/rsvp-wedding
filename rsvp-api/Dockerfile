# ---------- BUILD ----------
FROM public.ecr.aws/amazonlinux/amazonlinux:2023 AS build

RUN dnf install -y \
    python3.12 \
    python3.12-pip \
    zip \
    && dnf clean all

WORKDIR /build

COPY pyproject.toml .
COPY uv.lock .

RUN pip3.12 install . -t /build

COPY app /build/app

RUN zip -r /lambda.zip .


# ---------- OUTPUT ----------
FROM scratch
COPY --from=build /lambda.zip /lambda.zip