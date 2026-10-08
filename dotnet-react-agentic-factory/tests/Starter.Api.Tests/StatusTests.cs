using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Starter.Api;

namespace Starter.Api.Tests;

public sealed class StatusTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> factory;

    public StatusTests(WebApplicationFactory<Program> factory) => this.factory = factory;

    [Fact]
    public void StatusServiceReportsReady()
    {
        var result = new StatusService().GetStatus();
        Assert.Equal("Starter API", result.Name);
        Assert.Equal("ready", result.Status);
    }

    [Fact]
    [Trait("Category", "Acceptance")]
    public async Task StatusEndpointReturnsExpectedContract()
    {
        using var client = factory.CreateClient();
        using var response = await client.GetAsync("/api/status");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);
        var result = await response.Content.ReadFromJsonAsync<StatusResponse>();
        Assert.NotNull(result);
        Assert.Equal("Starter API", result.Name);
        Assert.Equal("ready", result.Status);
    }

    [Fact]
    public async Task HealthEndpointIsHealthy()
    {
        using var client = factory.CreateClient();
        using var response = await client.GetAsync("/health");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task UnknownRouteReturnsProblemDetails()
    {
        using var client = factory.CreateClient();
        using var response = await client.GetAsync("/api/missing");
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        Assert.Equal("application/problem+json", response.Content.Headers.ContentType?.MediaType);
    }
}
