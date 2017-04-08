var manageLocationTable;

$(document).ready(function() {
	// top bar active
	$('#navLocation').addClass('active');
	
	// manage Location table
	manageLocationTable = $('#manageLocationTable').DataTable({
		'ajax': 'php_action/fetchLocation.php',
		'order': []		
	});

	// submit location form function
	$("#submitLocationForm").unbind('submit').bind('submit', function() {
		// remove the error text
		$(".text-danger").remove();
		// remove the form error
		$('.form-group').removeClass('has-error').removeClass('has-success');			

		var locationName = $("#locationName").val();
		var locationStatus = $("#locationStatus").val();

		if(locationName == "") {
			$("#locationName").after('<p class="text-danger">Location Name field is required</p>');
			$('#locationName').closest('.form-group').addClass('has-error');
		} else {
			// remov error text field
			$("#locationName").find('.text-danger').remove();
			// success out for form 
			$("#locationName").closest('.form-group').addClass('has-success');
		}

		if(locationStatus == "") {
			$("#locationStatus").after('<p class="text-danger">Location Name field is required</p>');

			$('#locationStatus').closest('.form-group').addClass('has-error');
		} else {
			// remov error text field
			$("#locationStatus").find('.text-danger').remove();
			// success out for form 
			$("#locationStatus").closest('.form-group').addClass('has-success');
		}

		if(locationName && locationStatus) {
			var form = $(this);
			// button loading
			$("#createLocationBtn").button('loading');

			$.ajax({
				url : form.attr('action'),
				type: form.attr('method'),
				data: form.serialize(),
				dataType: 'json',
				success:function(response) {
					// button loading
					$("#createLocationBtn").button('reset');

					if(response.success == true) {
						// reload the manage member table 
						manageLocationTable.ajax.reload(null, false);

  	  			// reset the form text
						$("#submitLocationForm")[0].reset();
						// remove the error text
						$(".text-danger").remove();
						// remove the form error
						$('.form-group').removeClass('has-error').removeClass('has-success');
  	  			
  	  			$('#add-location-messages').html('<div class="alert alert-success">'+
            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
          '</div>');

  	  			$(".alert-success").delay(500).show(10, function() {
							$(this).delay(3000).hide(10, function() {
								$(this).remove();
							});
						}); // /.alert
					}  // if

				} // /success
			}); // /ajax	
		} // if

		return false;
	}); // /submit location form function

});

function editLocations(locationId = null) {
	if(locationId) {
		// remove hidden location id text
		$('#locationId').remove();

		// remove the error 
		$('.text-danger').remove();
		// remove the form-error
		$('.form-group').removeClass('has-error').removeClass('has-success');

		// modal loading
		$('.modal-loading').removeClass('div-hide');
		// modal result
		$('.edit-location-result').addClass('div-hide');
		// modal footer
		$('.editLocationFooter').addClass('div-hide');

		$.ajax({
			url: 'php_action/fetchSelectedLocation.php',
			type: 'post',
			data: {locationId : locationId},
			dataType: 'json',
			success:function(response) {
				// modal loading
				$('.modal-loading').addClass('div-hide');
				// modal result
				$('.edit-location-result').removeClass('div-hide');
				// modal footer
				$('.editLocationFooter').removeClass('div-hide');

				// setting the Location name value
				$('#editLocationName').val(response.location_name);
				// setting the location status value
				$('#editLocationStatus').val(response.location_active);
				// location id
				$(".editLocationFooter").after('<input type="hidden" name="locationId" id="locationId" value="'+response.location_id+'" />');

				// update location form
				$('#editLocationForm').unbind('submit').bind('submit', function() {

					// remove the error text
					$(".text-danger").remove();
					// remove the form error
					$('.form-group').removeClass('has-error').removeClass('has-success');			

					var locationName = $('#editLocationName').val();
					var locationStatus = $('#editLocationStatus').val();

					if(locationName == "") {
						$("#editLocationName").after('<p class="text-danger">Location Name field is required</p>');
						$('#editLocationName').closest('.form-group').addClass('has-error');
					} else {
						// remov error text field
						$("#editLocationName").find('.text-danger').remove();
						// success out for form 
						$("#editLocationName").closest('.form-group').addClass('has-success');
					}

					if(locationStatus == "") {
						$("#editLocationStatus").after('<p class="text-danger">Location Name field is required</p>');

						$('#editLocationStatus').closest('.form-group').addClass('has-error');
					} else {
						// remove error text field
						$("#editLocationStatus").find('.text-danger').remove();
						// success out for form 
						$("#editLocationStatus").closest('.form-group').addClass('has-success');
					}

					if(locationName && locationStatus) {
						var form = $(this);

						// submit btn
						$('#editLocationBtn').button('loading');

						$.ajax({
							url: form.attr('action'),
							type: form.attr('method'),
							data: form.serialize(),
							dataType: 'json',
							success:function(response) {

								if(response.success == true) {
									console.log(response);
									// submit btn
									$('#editLocationBtn').button('reset');

									// reload the manage member table 
									manageLocationTable.ajax.reload(null, false);
									// remove the error text
									$(".text-danger").remove();
									// remove the form error
									$('.form-group').removeClass('has-error').removeClass('has-success');
			  	  			
			  	  			$('#edit-location-messages').html('<div class="alert alert-success">'+
			            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
			            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
			          '</div>');

			  	  			$(".alert-success").delay(500).show(10, function() {
										$(this).delay(3000).hide(10, function() {
											$(this).remove();
										});
									}); // /.alert
								} // /if
									
							}// /success
						});	 // /ajax												
					} // /if

					return false;
				}); // /update location form

			} // /success
		}); // ajax function

	} else {
		alert('error!! Refresh the page again');
	}
} // /edit locations function

function removeLocations(locationId = null) {
	if(locationId) {
		$('#removeLocationId').remove();
		$.ajax({
			url: 'php_action/fetchSelectedLocation.php',
			type: 'post',
			data: {locationId : locationId},
			dataType: 'json',
			success:function(response) {
				$('.removeLocationFooter').after('<input type="hidden" name="removeLocationId" id="removeLocationId" value="'+response.location_id+'" /> ');

				// click on remove button to remove the Location
				$("#removeLocationBtn").unbind('click').bind('click', function() {
					// button loading
					$("#removeLocationBtn").button('loading');

					$.ajax({
						url: 'php_action/removeLocation.php',
						type: 'post',
						data: {locationId : locationId},
						dataType: 'json',
						success:function(response) {
							console.log(response);
							// button loading
							$("#removeLocationBtn").button('reset');
							if(response.success == true) {

								// hide the remove modal 
								$('#removeMemberModal').modal('hide');

								// reload the Location table
								manageLocationTable.ajax.reload(null, false);
								
								$('.remove-messages').html('<div class="alert alert-success">'+
			            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
			            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
			          '</div>');

			  	  			$(".alert-success").delay(500).show(10, function() {
										$(this).delay(3000).hide(10, function() {
											$(this).remove();
										});
									}); // /.alert
							} else {

							} // /else
						} // /response messages
					}); // /ajax function to remove the Location

				}); // /click on remove button to remove the Location

			} // /success
		}); // /ajax

		$('.removeLocationFooter').after();
	} else {
		alert('error!! Refresh the page again');
	}
} // /remove Locations function