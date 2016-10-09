<?php

// Configuracion //////////////////////////////////////////////////////////////

$dominio_permitido = str_replace('www.','', $_SERVER['SERVER_NAME']);

// Validacion de argumentos obligatorios //////////////////////////////////////

if(!isset($_REQUEST['recipient']) || $_REQUEST['recipient']=='') die('Falta el argumento "recipient" (destino)');
if(!isset($_REQUEST['email']) || $_REQUEST['email']=='') die('Falta el argumento "email" (remitente)');
if(!isset($_REQUEST['redirect']) || $_REQUEST['redirect']=='') die('Falta el argumento "redirect" (redirecci&oacute;n luego de enviar el mensaje)');

if(strpos($_REQUEST['recipient'], '<')!==false) die('Argumento recipient no seguro. &Eacute;ste no puede contener caracteres &lt; o &gt;.');
if(strpos($_REQUEST['recipient'], '>')!==false) die('Argumento recipient no seguro. &Eacute;ste no puede contener caracteres &lt; o &gt;.');
if(strpos($_REQUEST['recipient'], "\n")!==false) die('Argumento recipient no seguro. &Eacute;ste debe ser una sola l&iacute;nea.');
if(strpos($_REQUEST['recipient'], "\r")!==false) die('Argumento recipient no seguro. &Eacute;ste debe ser una sola l&iacute;nea.');

$subject = isset($_REQUEST['subject'])? $_REQUEST['subject'] : 'WIROOS Formmail v1.0';

if(strpos($subject, '<')!==false) die('Argumento subject no seguro. &Eacute;ste no puede contener caracteres &lt; o &gt;.');
if(strpos($subject, '>')!==false) die('Argumento subject no seguro. &Eacute;ste no puede contener caracteres &lt; o &gt;.');
if(strpos($subject, "\n")!==false) die('Argumento subject no seguro. &Eacute;ste debe ser una sola l&iacute;nea.');
if(strpos($subject, "\r")!==false) die('Argumento subject no seguro. &Eacute;ste debe ser una sola l&iacute;nea.');

if(isset($_REQUEST['realname']) && $_REQUEST['realname']!='')
{
        if(strpos($_REQUEST['realname'], '<')!==false) die('Argumento realname no seguro. &Eacute;ste no puede contener caracteres &lt; o &gt;.');
        if(strpos($_REQUEST['realname'], '>')!==false) die('Argumento realname no seguro. &Eacute;ste no puede contener caracteres &lt; o &gt;.');
        if(strpos($_REQUEST['realname'], "\n")!==false) die('Argumento realname no seguro. &Eacute;ste debe ser una sola l&iacute;nea.');
        if(strpos($_REQUEST['realname'], "\r")!==false) die('Argumento realname no seguro. &Eacute;ste debe ser una sola l&iacute;nea.');
}

// Validacion de recipient ////////////////////////////////////////////////////

// Separo las direcciones por coma
$destinos = explode(',', $_REQUEST['recipient']);

// Borro los espacios del principio y el final de cada direccion, si los hay
for($i=0; $i<sizeof($destinos); $i++)
        $destinos[$i] = trim($destinos[$i]);

// Verifico que cada direccion destino sea del dominio permitido
for($i=0; $i<sizeof($destinos); $i++)
{
        // Busco la posicion del arroba
        $arroba_pos = strpos($destinos[$i], '@');

        // Si no tiene arroba, se la agrego
        if($arroba_pos === false)
        {
                $destinos[$i] .= '@' . $dominio_permitido;
                continue;
        }
        // Si tiene arroba, verifico que el dominio corresponda a dominio_permitido
        else
        {
                // Si el dominio no es $dominio_permitido, muestro un mensaje de error
                if(substr($destinos[$i], $arroba_pos+1) != $dominio_permitido)
                        die($destinos[$i] . ' no es una direcci&oacute;n destino permitida.');
        }
}

// Composicion del mensaje ////////////////////////////////////////////////////

$mensaje = "Enviado por el IP (" . $_SERVER['REMOTE_ADDR'] . ")\n\n";

foreach($_REQUEST as $key => $value)
{
        if($key!='recipient' && $key!='email' && $key!='subject' && $key!='redirect')
                $mensaje .= $key . ": " . stripslashes($_REQUEST[$key]) . "\n";
}

// Envio del mensaje //////////////////////////////////////////////////////////

if(isset($_REQUEST['realname']) && $_REQUEST['realname']!='')
        $from = 'From: ' . $_REQUEST['realname'] . '<' . $_REQUEST['email'] . '>';
else
        $from = 'From: ' . $_REQUEST['email'];

mail(implode(',', $destinos), $subject, $mensaje, $from);

header('Location: ' . $_REQUEST['redirect']);


?>
