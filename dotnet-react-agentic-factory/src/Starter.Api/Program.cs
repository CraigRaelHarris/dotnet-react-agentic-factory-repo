using Starter.Api;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddProblemDetails();
builder.Services.AddHealthChecks();
builder.Services.AddSingleton<StatusService>();

var app = builder.Build();
app.UseExceptionHandler();
app.UseStatusCodePages();
app.MapHealthChecks("/health");
app.MapGet("/api/status", (StatusService service) => service.GetStatus());
app.Run();

// Allows WebApplicationFactory to host the real API in integration tests.
public partial class Program;
