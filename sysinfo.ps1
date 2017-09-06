#Get-NetIPAddress | Where-Object {$_.IPv4Address -like '10*'}

$EmailTo = "kohlrinj@ucmail.uc.edu"
$EmailFrom = "kohlrinj@ucmail.uc.edu"
$IP = Get-NetIPAddress | Where-Object {$_.IPv4Address -like '10*'}
$Body = "User: {0} Hostname: {1} IP: {2}" -f $env:UserName,$env:ComputerName,$IP
$Subject = "Your Windows IP Address"

Send-MailMessage -SmtpServer smtp.uc.edu -From $EmailFrom -To $EmailTo -Subject $Subject -Body $Body
