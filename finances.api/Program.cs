using finances.api.CategoryTotalsReport.Factories;
using finances.api.Repositories;
using finances.api.Services;
using finances.api.Services.Interfaces;
using finances2.api.data.nosql;
using finances2.api.Data;
using finances2.api.Data.Models;
using finances2.api.Repositories;
using finances2.api.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddApplicationInsightsTelemetry();

builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<IGroupRepository, GroupRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped(typeof(IEditableItemManagementService<>), typeof(EditableItemManagementService<>));
builder.Services.AddScoped<IEditableItemRepository<Category>, CategoryRepository>();
builder.Services.AddScoped<IEditableItemRepository<Group>, GroupRepository>();
builder.Services.AddScoped<IEditableItemRepository<Transaction>, TransactionRepository>();
builder.Services.AddScoped<IFinancesDbContext, AppDbContext>();
builder.Services.AddScoped<ICategoryTotalsReportCreator, CategoryTotalsReportCreator>();
builder.Services.AddScoped<IYearAndPeriodSearchValidator, YearAndPeriodSearchValidator>();
builder.Services.AddScoped<ITransactionGetter, TransactionGetter>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();
builder.Services.AddScoped<ITransactionManagementService, TransactionManagementService>();
builder.Services.AddScoped<ITransactionWageMover, TransactionWageMover>();
builder.Services.AddScoped<ITransactionFilterFactory, TransactionFilterFactory>();
builder.Services.AddScoped<ITransactionValueCalculaionFactory, TransactionValueCalculationFactory>();
builder.Services.AddScoped<IYearAndPeriodUtiltities, YearAndPeriodUtilities>();

builder.Services.AddCors(options => {
    var policyName = "MyAllowedOrigins";
    options.AddPolicy(name: policyName,
                      builder => builder
                            .WithOrigins("http://localhost:3000")
                            .WithOrigins("http://localhost:3001")
                            .WithOrigins("http://localhost:3002")
                            .WithOrigins("http://localhost:3003")
                            .WithOrigins("https://white-meadow-02c7d4703.6.azurestaticapps.net")
                            .AllowAnyHeader()
                            .AllowAnyMethod());
});

builder.Services.AddMvc().AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

var configuration = new ConfigurationBuilder()
    .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
    .AddJsonFile("appSettings.json")
    .Build();

var isIntegrationTest = false;

_ = builder.Environment.IsDevelopment() && false
    ? isIntegrationTest
        ? builder.Services.AddDbContext<AppDbContext>(
            options => options.UseInMemoryDatabase("App", new InMemoryDatabaseRoot())
            )
        : builder.Services.AddDbContext<AppDbContext>(
            options => options.UseInMemoryDatabase("App")
            )
    : builder.Services.AddDbContext<AppDbContext>(
        options => options.UseSqlServer(configuration.GetConnectionString("Finances"))
    );

builder.Services.Configure<JsonSerializerSettings>(options => options.ContractResolver = new DefaultContractResolver {
    NamingStrategy = new CamelCaseNamingStrategy()
});

var app = builder.Build();

if (app.Environment.IsDevelopment() && false) {
    var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetService<IFinancesDbContext>();
    var testDataFactory = new TestDataFactory(dbContext);
    testDataFactory.AddBaseData();
    testDataFactory.AddTransactions();
}

app.UseHttpsRedirection();

app.MapControllerRoute(
    name: "default",
    pattern: "api/{controller}/{action}");

app.UseCors("MyAllowedOrigins");

app.UseAuthorization();

app.Run();

public partial class Program { }