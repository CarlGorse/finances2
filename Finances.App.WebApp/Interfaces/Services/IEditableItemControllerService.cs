using Finances.Engine.Data.Models.Interfaces;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System.Collections.Generic;

namespace Finances.App.WebApp.Interfaces.Services {
    public interface IEditableItemControllerService<T> where T : class, IEditableItem<T> {
        IStatusCodeActionResult Add(T item);
        IStatusCodeActionResult Delete(IEnumerable<int> ids);
        IStatusCodeActionResult Edit(T item);
        IStatusCodeActionResult Get(IEnumerable<int> ids);
    }
}