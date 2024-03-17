using finances.api.Data.Models;
using finances.api.Dtos;
using finances.api.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace finances.api.Services {

    public class EditableItemControllerService<T> : IEditableItemControllerService<T> where T : class, IEditableItem<T> {

        private readonly IEditableItemRepository<T> _editableItemRepository;
        private readonly IItemProperties<T> _itemProperties;

        public EditableItemControllerService(
            IItemProperties<T> itemProperties,
            IEditableItemRepository<T> editableItemRepository) {

            _itemProperties = itemProperties;
            _editableItemRepository = editableItemRepository;
        }

        public IStatusCodeActionResult Get(IEnumerable<int> ids) {

            var items = _editableItemRepository.Get(ids);

            if (!items.Any()) {

                var value = JsonSerializer.Serialize(new {
                    ids,
                    validationErrors = new List<string> { $"Unknown {_itemProperties.DescriptionSingle}" }
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

            switch (result) {
                case EditResult.Invalid:
                    var value = JsonSerializer.Serialize(new { item, validationErrors });
                    return new ObjectResult(item) {
                        StatusCode = StatusCodes.Status400BadRequest
                    };
                case EditResult.Error:
                    return new ObjectResult(item) {
                        StatusCode = StatusCodes.Status500InternalServerError
                    };
                default:
                    return new OkObjectResult(new { item = item });
            }
        }

        public IStatusCodeActionResult Edit(T item) {

            var result = _editableItemRepository.Edit(item, out var validationErrors, out var updatedItem);

            switch (result) {
                case EditResult.Invalid:
                    var value = JsonSerializer.Serialize(new { updatedItem, validationErrors });
                    return new ObjectResult(item) {
                        StatusCode = StatusCodes.Status400BadRequest
                    };
                case EditResult.Error:
                    return new ObjectResult(item) {
                        StatusCode = StatusCodes.Status500InternalServerError
                    };
                default:
                    return new OkObjectResult(new { item = updatedItem });
            }
        }

        public IStatusCodeActionResult Delete(IEnumerable<int> ids) {

            var result = _editableItemRepository.Delete(ids, out var validationErrors);

            switch (result) {
                case EditResult.Invalid:
                    var value = JsonSerializer.Serialize(new { ids, validationErrors });
                    return new ObjectResult(ids) {
                        StatusCode = StatusCodes.Status400BadRequest
                    };
                case EditResult.Error:
                    return new ObjectResult(ids) {
                        StatusCode = StatusCodes.Status500InternalServerError
                    };
                default:
                    return new OkObjectResult(new { ids });
            }
        }
    }
}
