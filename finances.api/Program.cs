using finances.api.Data;
using finances.api.Data.Models;
using finances.api.Repositories;
using finances.api.Services;
using finances.api.test.data;
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

builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<IGroupRepository, GroupRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped(typeof(IEditableItemManagementService<>), typeof(EditableItemManagementService<>));
builder.Services.AddScoped<IEditableItemRepository<Category>, CategoryRepository>();
builder.Services.AddScoped<IEditableItemRepository<Group>, GroupRepository>();
builder.Services.AddScoped<IEditableItemRepository<Transaction>, TransactionRepository>();
builder.Services.AddScoped<IFinancesDbContext, AppDbContext>();
builder.Services.AddScoped<IReportService, ReportService>();
builder.Services.AddScoped<ISearchCriteriaService, SearchCriteriaService>();
builder.Services.AddScoped<ITransactionGetter, TransactionGetter>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();
builder.Services.AddScoped<ITransactionManagementService, TransactionManagementService>();
builder.Services.AddScoped<ITransactionWageMover, TransactionWageMover>();
builder.Services.AddScoped<IYearAndPeriodService, YearAndPeriodService>();

builder.Services.AddCors(options => {
    var policyName = "MyAllowedOrigins";
    options.AddPolicy(name: policyName,
                      builder => builder
                            .WithOrigins("http://localhost:3000")
                            .AllowAnyHeader()
                            .AllowAnyMethod());
});

builder.Services.AddMvc().AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

var configuration = new ConfigurationBuilder()
    .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
    .AddJsonFile("appSettings.json")
    .Build();

var isIntegrationTest = false;

if (builder.Environment.IsDevelopment() && false) {
    if (isIntegrationTest) {
        builder.Services.AddDbContext<AppDbContext>(
            options => options.UseInMemoryDatabase("App", new InMemoryDatabaseRoot())
            );
    }
    else {
        builder.Services.AddDbContext<AppDbContext>(
            options => options.UseInMemoryDatabase("App")
            );
    }
}
else {
    builder.Services.AddDbContext<AppDbContext>(
        options => options.UseSqlServer(configuration.GetConnectionString("Finances"))
    );

}

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