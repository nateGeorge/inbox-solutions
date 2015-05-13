$(function () {

  // ---- INITIAL PAGE LOAD
  var templateString = $('[data-template=message]').text();
  var $messagesContainer = $("[data-container=messages]");
  $.getJSON('/api/inbox.json').then(function (data) {
    data.messages.forEach(function (message) {
      $messagesContainer.append(
        templateString
          .replace('{readClass}', message.read ? 'read' : 'unread')
          .replace('{checked}', '')
          .replace('{starClass}', message.starred ? 'fa-star' : 'fa-star-o')
          .replace('{selectedClass}', '')
          .replace('{subject}', message.subject)
      )
    });
  });

  // ---- User can select all messages
  // ---- User can deselect all messages
  $('[data-behavior=multiselect]').on('click', function () {
    var $checkboxes = $messagesContainer.find(':checkbox');

    if ($checkboxes.filter(':checked').length > 0) {
      $(this).find('i')
        .removeClass('fa-check-square-o')
        .removeClass('fa-minus-square-o')
        .addClass('fa-square-o');

      $messagesContainer.find(':checkbox')
        .prop('checked', false)
        .closest('[data-message]')
        .removeClass('selected');

      $('[data-disableable]').prop('disabled', true);
    } else {
      $(this).find('i')
        .removeClass('fa-square-o')
        .removeClass('fa-minus-square-o')
        .addClass('fa-check-square-o');

      $messagesContainer.find(':checkbox')
        .prop('checked', true)
        .closest('[data-message]')
        .addClass('selected');

      $('[data-disableable]').prop('disabled', false);
    }
  });

});
