namespace Starter.Api;

public sealed record StatusResponse(string Name, string Status);

public sealed class StatusService
{
    private readonly string name = "Starter API";

    public StatusResponse GetStatus() => new(name, "ready");
}
