<div id="pfw-welcome-page">
<h1>Thanks for using WooTablePro!</h1>
<ul>
    <li>To get instant support, please drop me an email at <a href="mailto:dat.tm24@gmail.com">dat.tm24@gmail.com</a> </li>
    <li>To help you get started quickly, I created a video tutorial here. It's a must watch:</li>
    <li>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/bdCczoxyDu4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </li>
    <li><strong>VERY IMPORTANT!</strong> To watch the tutorials on how to use the plugin, please <a href="https://www.youtube.com/playlist?list=PL6rw2AEN42ErWSxMdeRXOAcqgMRMSgpQd">click here</a></li>
</ul>
    <?php if (!PFW_IS_PRO): ?>
     <h1>Upgrade to pro version for more features</h1>
    <p>Upgrading to the pro version enable you to get some essential features such as:</p>
    <ol>
        <li>Add the filters for product name, categories, price, rating</li>
        <li>Get access to new themes</li>
        <li>Customize the buttons. You are not limited to just one style as in the free version</li>
    </ol>

        <a href="https://binarycarpenter.com/product-table-plugin-for-woocommerce/" class="button button-primary">Upgrade now</a>
    <?php else: ?>
        <?php if(get_option(PFW_META_IS_ACTIVATED, false) !== 'valid'): ?>
        <?php echo (isset($_GET['message']) ? '<h1>'. $_GET['message'] . '</h1>' : ''); ?>
        <!--      activation boxes      -->
            <form action="<?php echo admin_url('admin-post.php'); ?>">

                <label for="pfw_email">Enter your email (the one you used when purchasing)</label>
                <input type="text" name="pfw_email" id="pfw_email" placeholder="Please enter your email">
                <label for="pfw_license_key">Enter your license key (sent to you after your purchase)</label>
                <input type="text" name="pfw_license_key" id="pfw_license_key" placeholder="Please enter license key">
                <input type="hidden" name="action" value="pfw_handle_activation">
                <?php wp_nonce_field('pfw_handle_activation', 'wootable_activation_field'); ?>
                <input type="submit" class="button button-primary" value="Activate your license">
            </form>
        <?php endif; ?>

    <?php endif; ?>
</div>