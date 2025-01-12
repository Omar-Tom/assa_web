<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect form data
    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    $address = htmlspecialchars($_POST['address']);
    $meals = isset($_POST['meal']) ? implode(", ", $_POST['meal']) : '';
    $sides = isset($_POST['side']) ? implode(", ", $_POST['side']) : '';

    // Create the email content
    $subject = "New Wing Order from " . $name;
    $message = "
    <html>
    <head>
        <title>New Wing Order</title>
    </head>
    <body>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Address:</strong> $address</p>
        <p><strong>Meals Ordered:</strong> $meals</p>
        <p><strong>Sides Ordered:</strong> $sides</p>
    </body>
    </html>
    ";

    // Set the headers for HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";

    // Email recipient (change this to the desired email)
    $to = "diptytom@gmail.com";

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "Your order has been successfully placed!";
    } else {
        echo "There was an error placing your order. Please try again later.";
    }
}
?>
