# https://hub.docker.com/_/microsoft-dotnet-core
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY Ems.Web/Ems.Web.csproj Ems.Web/
COPY Ems.Data/Ems.Data.csproj Ems.Data/
RUN dotnet restore Ems.Web/Ems.Web.csproj

# copy and build app and libraries
COPY Ems.Web/ Ems.Web/
COPY Ems.Data/ Ems.Data/
WORKDIR /source/Ems.Web
RUN dotnet build -c release --no-restore

# test stage -- exposes optional entrypoint
# target entrypoint with: docker build --target test
FROM build AS test
WORKDIR /source/tests
COPY Ems.Test/ .
ENTRYPOINT ["dotnet", "test", "--logger:trx"]

FROM build AS publish
RUN curl --silent --location https://deb.nodesource.com/setup_10.x | bash - && apt-get install --yes nodejs && npm install -g yarn
RUN dotnet publish -c release --no-build -o /app

# final stage/image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
ENV ASPNETCORE_URLS=http://+5000
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Ems.Web.dll"]
