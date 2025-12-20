.PHONY: build clean deploy destroy

build: clean
	docker buildx build --platform=linux/amd64 --output type=local,dest=. .

clean:
	rm -f lambda.zip

deploy: build
	cd terraform && terraform apply

destroy:
	cd terraform && terraform destroy
