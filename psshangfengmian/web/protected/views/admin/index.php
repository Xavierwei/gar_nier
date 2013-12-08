<table id="photo_admin_table"  border="0" cellspacing="0" cellpadding="0">
	<thead>
		<tr>
			<th>ID</th>
			<th>Preview</th>
			<th>Post Date</th>
			<th>User</th>
			<th>Vote</th>
			<th>Actions</th>
		</tr>
	</thead>
	<tbody>
		<?php foreach ($list as $item): ?>
		<tr>
			<td><span><?php echo $item["photo_id"]?></span></td>
			<td><img src="./<?php echo $item["path"]?>" alt="" width="80" height="100"></td>
			<td><span><?php echo $item["datetime"]?></span></td>
			<td><span><?php echo $item["nickname"]?></span></td>
			<td><span><?php echo $item["vote_count"]?></span></td>
			<td><a href="#" class="delete_photo" data="<?php echo $item["photo_id"]?>">Delete</a></td>
		</tr>
		<?php endforeach;?>
	</tbody>
</table>

<p style="display:none" id="dialog">Are you sure to delete it ?</p>

<script type="text/javascript">
	(function ($) {
		$("#photo_admin_table").dataTable();

		$(".delete_photo").click(function (e) {
			var photo_id = $(this).attr("data");
			e.preventDefault();
			$("#dialog").dialog({
				buttons: [{
					text: "Confirm",
					click: function () {
						$.ajax({
							url: "./index.php?r=admin/delete&photo_id=" + photo_id,
							success: function () {
								window.location.reload();
							}
						});
						$( this ).dialog( "close" );
					}
				}, {
					text: "Cancel",
					click: function () {
						$(this).dialog("close");
					}
				}]
			});
		});
	})(jQuery);
</script>
