using finances.api.Data.Models;
using finances.api.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace finances.api.Services {

    public class EditableItemControllerService<T>(IEditableItemRepository<T> editableItemRepository) : IEditableItemControllerService<T> where T : class, IEditableItem<T> {

        private readonly IEditableItemRepository<T> _editableItemRepository = editableItemRepository;

        public IStatusCodeActionResult Get(IEnumerable<int> ids) {

            var items = _editableItemRepository.Get(ids);

            if (!items.Any()) {

                var value = JsonSerializer.Serialize(new {
                    ids,
                    validationErrors = new List<string> { $"Unknown {T.TypeDescription}" }
                }
                );

                return new ObjectResult(value) {
                    StatusCode = StatusCodes.Status406NotAcceptable
                };
            }

            return new OkObjectResult(new { items });
        }

        public IStatusCodeActionResult Add(T item) {

            var result = _editableItemRepository.Add(item, out var validationErrors, saveChanges: true);

            return result switch {
                EditResult.Invalid => new ObjectResult(JsonSerializer.Serialize(new { item, validationErrors })) {
                    StatusCode = StatusCodes.Status400BadRequest
                },
                EditResult.Error => new ObjectResult(item) {
                    StatusCode = StatusCodes.Status500InternalServerError
                },
                _ => new OkObjectResult(new { item }),
            };
        }

        public IStatusCodeActionResult Edit(T item) {

            var result = _editableItemRepository.Edit(item, out var validationErrors, out var updatedItem);

            return result switch {
                EditResult.Invalid => new ObjectResult(JsonSerializer.Serialize(new { updatedItem, validationErrors })) {
                    StatusCode = StatusCodes.Status400BadRequest
                },
                EditResult.Error => new ObjectResult(item) {
                    StatusCode = StatusCodes.Status500InternalServerError
                },
                _ => new OkObjectResult(new { item = updatedItem }),
            };
        }

        public IStatusCodeActionResult Delete(IEnumerable<int> ids) {

            var result = _editableItemRepository.Delete(ids, out var validationErrors);

            return result switch {
                EditResult.Invalid => new ObjectResult(JsonSerializer.Serialize(new { ids, validationErrors })) {
                    StatusCode = StatusCodes.Status400BadRequest
                },
                EditResult.Error => new ObjectResult(ids) {
                    StatusCode = StatusCodes.Status500InternalServerError
                },
                _ => new OkObjectResult(new { ids }),
            };
        }
    }
}
