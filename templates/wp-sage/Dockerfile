FROM wordpress:latest

RUN apt-get update && apt-get install -y curl software-properties-common

RUN curl -sSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash - \
	&& export NVM_DIR=$HOME/.nvm && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"   \
	&& nvm install --lts \
	&& curl -sSL https://yarnpkg.com/install.sh | bash -

RUN curl -sSL https://getcomposer.org/installer | php \
	&& mv composer.phar /usr/local/bin/composer \
	&& chmod +x /usr/local/bin/composer
