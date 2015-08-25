$(function() {
  $('.guest-button').click(function() {
    var $form = $(this).closest('form');

    $form.find('[name="user[name]"]').val('guest@promulgation.ninja');
    $form.find('[name="user[password]"]').val('guest');

    $form.submit();
  });
});
