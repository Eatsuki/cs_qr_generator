var scanner = new Instascan.Scanner({ video: document.getElementById('preview'), scanPeriod: 5, mirror: true });
					scanner.addListener('scan',function(content){
						
						document.querySelector("#text").value=content;

						var formData = new FormData($("#form2")[0]);

						
						$.ajax({
								url:"insert_records.php",
								type:"POST",
								data:formData,
								success:function(res){

								document.getElementById("msg").innerHTML=res;
								
								
						},
								cache:false,
								contentType: false,
								processData:false		   
						}); 



						
					});
					Instascan.Camera.getCameras().then(function (cameras){
						if(cameras.length>0){
							scanner.start(cameras[0]);
							$('[name="options"]').on('change',function(){
								if($(this).val()==1){
									if(cameras[0]!=""){
										scanner.start(cameras[0]);
									}else{
										alert('No Front camera found!');
									}
								}
							});
						}else{
							console.error('No cameras found.');
							alert('No cameras found.');
						}
					}).catch(function(e){
						console.error(e);
						alert(e);
					});