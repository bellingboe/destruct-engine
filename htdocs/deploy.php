<?php
	/**
	 * GIT DEPLOYMENT SCRIPT
	 *
	 * Used for automatically deploying websites via github or bitbucket, more deets here:
	 *
	 *		https://gist.github.com/1809044
	 */
	
	error_reporting(E_ALL);
	
        try
        {
                // Decode the payload json string
                $payload = json_decode($_POST['payload']);
        }
        catch(Exception $e)
        {
                exit;
        }
	
	// Log the payload object
	file_put_contents('logs/github.txt', print_r($payload, TRUE));
	
	ob_start();
	var_dump($_REQUEST);
	$contents = ob_get_contents();
	ob_end_clean();
	error_log($contents);
 
 	$output = '';
 
        // Pushed to master?
        if ($payload->ref === 'refs/heads/master')
        {
                // Prep the URL - replace https protocol with git protocol to prevent 'update-server-info' errors
                $url = str_replace('https://github.com/', 'git@github.com:', $payload->repository->url);
 
                // Run the build script as a background process
		
			//$cmd = './cmd/build.sh '.$url.' '.$payload->repository->name;
        	//$cmd = 'cd ..';
            //$build = shell_exec($cmd);
			//$output .= "<span style=\"color: #6BE234;\">\$</span> <span style=\"color: #729FCF;\">{$cmd}\n</span>";
			//$output .= htmlentities(trim($build)) . "\n";
        }
 
	// The commands
	$commands = array(
		'echo $PWD',
		'cd ..',
		'whoami',
		'git reset --hard HEAD',
		'git pull',
		'git status',
		'git submodule sync',
		'git submodule update',
		'git submodule status',
	);
 
	// Run the commands for output

	foreach($commands AS $command){
		// Run it
		$tmp = shell_exec($command);
		// Output
		$output .= "<span style=\"color: #6BE234;\">\$</span> <span style=\"color: #729FCF;\">{$command}\n</span>";
		$output .= htmlentities(trim($tmp)) . "\n";
	}
 
	// Make it pretty for manual user access (and why not?)
?>
<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>GIT DEPLOYMENT SCRIPT</title>
</head>
<body style="background-color: #000000; color: #FFFFFF; font-weight: bold; padding: 0 10px;">
<pre>
 .  ____  .    ____________________________
 |/      \|   |                            |
[| <span style="color: #FF0000;">&hearts;    &hearts;</span> |]  | Git Deployment Script v0.1 |
 |___==___|  /              &copy; oodavid 2012 |
              |____________________________|
 
<?php echo $output; ?>
</pre>
</body>
</html>