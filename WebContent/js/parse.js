/**
 * 
 */
Parse.initialize("2LtDjadP74Th3XfebZvQjEtjvK9wqkKNsG8XOpbq",
		"x2LKddxBl61XGECpX2v1LbIpst21uNvrFN527rPN");
var residents = new Array();
$(document).ready(
		function() {
			var Residents = Parse.Object.extend("Residents");
			var timer = 0;
			$(".formLogIn").submit(
					function() {
						var username = $(".usernameForm").val();
						var password = $(".passwordForm").val();

						Parse.User.logIn(username, password, {
							success : function(user) {
								window.location = "documents.html";

							},
							error : function(user, error) {
								alert("Oh no! There must have been a mistake "
										+ "error: " + error.message);
							}
						});
						return false;
					});
			var updateList = function(residents) {
				$(".itemData").remove();
				$(".list-group").append(
						'<a href="#" id="residentChosen" class="list-group-item active itemData">'
								+ residents[0].get("name") + '</a>');
				for (var i = 1; i < residents.length; i++) {
					$(".list-group").append(
							'<a href="#" class="list-group-item itemData">'
									+ residents[i].get("name") + '</a>');
				}
				$(".itemData").click(
						function(event) {
							$(".itemData").removeClass("active");
							$(".itemData").removeAttr("id");
							$(event.target).addClass("active");
							$(event.target).attr("id", "residentChosen");
							var name = $(event.target).text();
							var MyRows = $("#schedule").find('tbody')
									.find('tr');
							var query = new Parse.Query(Residents);
							var schedule;
							query.equalTo("name", name);

							query.first({
								success : function(result) {
									schedule = result.get("schedule");
									if (schedule !== undefined) {
										$(".clearable").text("");
										var monday = schedule.monday;
										$(MyRows[0]).find('td:eq(1)').html(
												monday.event1.name);
										$(MyRows[1]).find('td:eq(1)').html(
												monday.event2.name);
										$(MyRows[2]).find('td:eq(1)').html(
												monday.event3.name);
										$(MyRows[3]).find('td:eq(1)').html(
												monday.event4.name);
										$(MyRows[4]).find('td:eq(1)').html(
												monday.event5.name);
										$(MyRows[5]).find('td:eq(1)').html(
												monday.event6.name);
										var tuesday = schedule.tuesday;
										$(MyRows[0]).find('td:eq(2)').html(
												tuesday.event1.name);
										$(MyRows[1]).find('td:eq(2)').html(
												tuesday.event2.name);
										$(MyRows[2]).find('td:eq(2)').html(
												tuesday.event3.name);
										$(MyRows[3]).find('td:eq(2)').html(
												tuesday.event4.name);
										$(MyRows[4]).find('td:eq(2)').html(
												tuesday.event5.name);
										$(MyRows[5]).find('td:eq(2)').html(
												tuesday.event6.name);
										var wednesday = schedule.wednesday;
										$(MyRows[0]).find('td:eq(3)').html(
												wednesday.event1.name);
										$(MyRows[1]).find('td:eq(3)').html(
												wednesday.event2.name);
										$(MyRows[2]).find('td:eq(3)').html(
												wednesday.event3.name);
										$(MyRows[3]).find('td:eq(3)').html(
												wednesday.event4.name);
										$(MyRows[4]).find('td:eq(3)').html(
												wednesday.event5.name);
										$(MyRows[5]).find('td:eq(3)').html(
												wednesday.event6.name);
										var thursday = schedule.thursday;
										$(MyRows[0]).find('td:eq(4)').html(
												thursday.event1.name);
										$(MyRows[1]).find('td:eq(4)').html(
												thursday.event2.name);
										$(MyRows[2]).find('td:eq(4)').html(
												thursday.event3.name);
										$(MyRows[3]).find('td:eq(4)').html(
												thursday.event4.name);
										$(MyRows[4]).find('td:eq(4)').html(
												thursday.event5.name);
										$(MyRows[5]).find('td:eq(4)').html(
												thursday.event6.name);
										var friday = schedule.friday;
										$(MyRows[0]).find('td:eq(5)').html(
												friday.event1.name);
										$(MyRows[1]).find('td:eq(5)').html(
												friday.event2.name);
										$(MyRows[2]).find('td:eq(5)').html(
												friday.event3.name);
										$(MyRows[3]).find('td:eq(5)').html(
												friday.event4.name);
										$(MyRows[4]).find('td:eq(5)').html(
												friday.event5.name);
										$(MyRows[5]).find('td:eq(5)').html(
												friday.event6.name);
									} else {
										$(".clearable").text("");
									}
								},
								error : function(object, error) {
									alert("something went wrong"
											+ error.message);
								}
							});

						});
				if (timer === 0) {
					$("#residentChosen").trigger("click");
				}
				timer++;
			}
			var query = new Parse.Query(Residents);
			query.ascending("name");
			query.find({
				success : function(results) {
					for (var i = 0; i < results.length; i++) {
						residents[i] = results[i];
					}
					updateList(residents);
				},
				error : function(error) {

				}
			});
			var parseFile;
			$("#imagePreview").css("background-image", "url('img/contactPicture.jpg')");
			$("#contactPicture").on('change',function(){
				var fileUploadControl = $("#contactPicture")[0];
				var files = !!this.files ? this.files : [];
		        if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support
		 
		        if (/^image/.test(files[0].type)){ // only image file
		            var reader = new FileReader(); // instance of the FileReader
		            reader.readAsDataURL(files[0]); // read the local file
		 
		            reader.onloadend = function(){ // set image data as background of div
		                $("#imagePreview").css("background-image", "url("+this.result+")");
		            }
		        }
				if (fileUploadControl.files.length > 0) {
				  var file = fileUploadControl.files[0];
				  var contactName = "contact.jpg";
				  parseFile = new Parse.File(contactName, file);
				  parseFile.save().then(function() {
					  // The file has been saved to Parse.
					}, function(error) {
					  alert("picture error");
					});
				}
			});
			$("#newcontactPicture").on('change',function(){
				var fileUploadControl = $("#newcontactPicture")[0];
				var files = !!this.files ? this.files : [];
		        if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support
		 
		        if (/^image/.test(files[0].type)){ // only image file
		            var reader = new FileReader(); // instance of the FileReader
		            reader.readAsDataURL(files[0]); // read the local file
		 
		            reader.onloadend = function(){ // set image data as background of div
		                $("#newimagePreview").css("background-image", "url("+this.result+")");
		            }
		        }
				if (fileUploadControl.files.length > 0) {
				  var file = fileUploadControl.files[0];
				  var contactName = "contact.jpg";
				  parseFile = new Parse.File(contactName, file);
				  parseFile.save().then(function() {
					  // The file has been saved to Parse.
					}, function(error) {
					  alert("picture error. try reloading page");
					});
				}
			});
			$(".userButton").click(function() {
				var name = $("#name").val();
				var color = $('input[name="optionsRadios"]:checked').val();
				if (name === "" || color === undefined) {
					$(".residentNotAdded").slideDown().delay(3000)
					.slideUp();
				} else {
					var resident = new Residents();
					name = name.substring(0,1).toUpperCase() + name.substring(1,name.length);
					resident.set("name", name);
					resident.set("color", color.toLowerCase());
					resident.set("picture", parseFile);
					resident.save(null, {
						success : function(gameScore) {
							$('#myModal').modal('hide')
							query.find({
								success : function(results) {
									for (var i = 0; i < results.length; i++) {
										residents[i] = results[i];
									}
									timer = 0;
									updateList(residents);
								},
								error : function(error) {
								}
							});
						},
						error : function(gameScore, error) {
							$(".residentNotAdded").slideDown().delay(3000)
							.slideUp();
						}
					});
				}
			});
			
			$(".clearModalButton").click(function() {
				$("#name").val("");
				$('input[name="optionsRadios"]').prop("checked", false);
				$("#contactPicture").val("");
				$("#imagePreview").css("background-image", "url('img/contactPicture.jpg')");
				
			});
			$(".editSchedule").click(function() {
				var residentName = $("#residentChosen").text();
				var query = new Parse.Query(Residents);
				query.equalTo("name", residentName);
				query.first({
					success : function(result) {
						$("#newName").val(residentName);
						var residentColor = result.get("color");
						switch(residentColor) {
						case "red":
							$("#newoptionsRadios1").prop("checked", true)
							break;
						case "blue":
							$("#newoptionsRadios2").prop("checked", true)
							break;
						case "green":
							$("#newoptionsRadios3").prop("checked", true)
							break;
						case "yellow":
							$("#newoptionsRadios4").prop("checked", true)
							break;
						}
						var contactPhoto = result.get("picture");
						if(contactPhoto === undefined) {
							$("#newimagePreview").css("background-image", "url('img/contactPicture.jpg')");
						}
						else {
							$("#newimagePreview").css("background-image", "url("+contactPhoto.url()+")");
						}
					},
					error : function(object, error) {
						
					}
				});
				
			});
			$(".editUserButton").click(function() {
				var residentName = $("#residentChosen").text();
				var newName = $("#newName").val();
				var newColor = $('input[name="newoptionsRadios"]:checked').val();
				if(newName  === "" || newColor === undefined) {
					$(".residentNotEdited").slideDown().delay(3000)
					.slideUp();
				}
				else {
				
				newName = newName.substring(0,1).toUpperCase() + newName.substring(1,newName.length);
				var query = new Parse.Query(Residents);
				query.equalTo("name", residentName);
				query.first({
					success : function(result) {
						result.set("name", newName);
						result.set("color", newColor.toLowerCase());
						result.set("picture", parseFile);
						result.save();
						$('#editModal').modal('hide')
						var query2 = new Parse.Query(Residents);
						query2.ascending("name");
						query2.find({
							success : function(results) {
								for (var i = 0; i < results.length; i++) {
									residents[i] = results[i];
								}
								updateList(residents);
							},
							error : function(error) {

							}
						});
					},
					error : function(object, error) {
						$(".residentNotEdited").slideDown().delay(2000)
								.slideUp();
					}
				});
			}
			});

		});
