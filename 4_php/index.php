<?php
// 1. Logic Section: Define variables or fetch data before rendering the page
$pageTitle = "Welcome to My PHP Site";
$currentYear = date("Y");

$services = [
    "Web Development",
    "UI/UX Design",
    "Digital Marketing",
    "SEO Optimization"
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle; ?></title>
    <style>
        body { font-family: sans-serif; line-height: 1.6; margin: 40px; background: #f9f9f9; color: #333; }
        container { max-width: 800px; margin: auto; background: white; padding: 20px; border-radius: 8px; }
        footer { margin-top: 20px; font-size: 0.9em; color: #777; }
    </style>
</head>
<body>

    <div class="container">
        <!-- 2. Display Section: Outputting basic strings -->
        <h1><?php echo $pageTitle; ?></h1>
        <p>This page is successfully rendering HTML seamlessly combined with backend PHP execution.</p>

        <h2>Our Services</h2>
        <ul>
            <!-- 3. Dynamic Section: Looping through data to create HTML elements -->
            <?php foreach ($services as $service): ?>
                <li><?php echo htmlspecialchars($service); ?></li>
            <?php endforeach; ?>
        </ul>

        <footer>
            <p>&copy; <?php echo $currentYear; ?> My Dynamic Website. All rights reserved.</p>
        </footer>
    </div>

</body>
</html>
