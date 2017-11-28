<?php
ini_set("memory_limit","64M");

/**
  _____________________________________________________________________________
 |
 | sessionSave.php
 |
 | @project     WCS-NAECPA
 | @revision    $Id: SaveSession.php 443 2011-03-31 20:10:33Z pdeschamps $
 | @purpose     Save map session
 |              
 | @author      Paul Deschamps (pdeschamps@dmsolutions.ca)
 | @copyright
 | <b>Copyright (c) 2001-2006 DM Solutions Group Inc.</b>
 | Permission is hereby granted, free of charge, to any person obtaining a
 | copy of this software and associated documentation files (the "Software"),
 | to deal in the Software without restriction, including without limitation
 | the rights to use, copy, modify, merge, publish, distribute, sublicense,
 | and/or sell copies of the Software, and to permit persons to whom the
 | Software is furnished to do so, subject to the following conditions:
 |
 | The above copyright notice and this permission notice shall be included
 | in all copies or substantial portions of the Software.
 |
 | THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 | IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 | FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 | THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 | LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 | FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHERf
 | DEALINGS IN THE SOFTWARE.
 |_____________________________________________________________________________

 **/
 
//dl('zip.so');
 /* set up the session */
include(dirname(__FILE__).'/Common.php');
include('../../../common/php/Utilities.php');
//header('Content-type: application/json');
//header('X-JSON: true');

if (!isset($mapName)) {
    die("{'error':'mapname not set'}");
}

isset($_POST["session"])?$szSessionID = $_POST["session"]:$szSessionID = NULL ;
isset($_REQUEST["layers"])?$szLayers = $_REQUEST["layers"]:$szLayers = NULL ;
isset($_REQUEST["extents"])?$szExtents = $_REQUEST["extents"]:$szExtents = NULL ;
isset($_REQUEST["queryfile"])?$szQueryFile = $_REQUEST["queryfile"]:$szQueryFile = NULL ;

if (isset($_SESSION['maps']) && isset($_SESSION['maps'][$mapName])) {

    $oReturn = NULL;
    
    $oMap = ms_newMapObj($_SESSION['maps'][$mapName]);
    $oReturn->sessionKey = generateKey(7);

    $szStoreSessionPath = $_SESSION['fusionConfig']->mapserver->mapRestoreState;
    $szFilePhpSession = $_SESSION['fusionConfig']->mapserver->mapRestoreStateSession;
    $szZipFilename = $szStoreSessionPath."/ss_".$oReturn->sessionKey.".zip";
    $szSourceDir = $szFilePhpSession."/sess_".$szSessionID."/";
    
    // check to see if the file exists already it's a 1: 3,521,614,606,208 chance but not impossible :)
    if(file_exists($szZipFilename)){
        while(file_exists($szZipFilename) === TRUE){
            $oReturn = NULL;
            $oReturn->sessionKey = generateKey(7);
            $szZipFilename = $szStoreSessionPath.$oReturn->sessionKey.".zip";
        }
    }

    // data for the session Save File
    $aData["mapname"] = $mapName;
    $aData["sessionKey"] = $oReturn->sessionKey;
    $aData["_afCurrentExtents"] = $szExtents;
    $aData["aVisibleLayers"] = $szLayers;
    $aData["queryfile"] = $szQueryFile;

    // set the visable state in the session mapfile
    turnOnVisableLayersInMapFile($oMap);

    // save the map
    $oMap->save($_SESSION['maps'][$mapName]);

    // create the session save file
    writeSessionSaveControlFile($aData,$szSourceDir."/");

    // create a new zip.
    $zip = new ZipArchive;

    if ($zip->open($szZipFilename, ZIPARCHIVE::CREATE)!==TRUE) {
        exit("{'error':'Can not create archive'}");
    } else {
        make_archive( $szSourceDir , &$zip, $extdir="");
        $zip->close();
        echo var2json($oReturn);
        $handle = fopen($szStoreSessionPath.$oReturn->sessionKey.".dat", "w+");
        
        fwrite($handle, serialize($aData));
        fclose($handle);
        
        //$result = new SavedSession($oReturn->sessionKey, true);
    }
}

function writeSessionSaveControlFile($aData,$szPath){
  
    $handle = fopen($szPath."sessionInfo.txt", "w+");
    $szOutput = "";
    
    fwrite($handle, serialize($aData));
    fclose($handle);
}	

function readSessionSaveControlFile($szFileName){
    
    $handle = @fopen($szFileName, "r");
    
    if($handle) {
        $szData = fread($handle, filesize($szFileName));
        fclose($handle);
    }
    
    return unserialize($szData);
}

function turnOnVisableLayersInMapFile($oMap){
    global $szLayers;
	
	
	// trun off all layers except ones hidden from legend.
	for ($i=0;$i<$oMap->numlayers;$i++){
		$oLayer=$oMap->GetLayer($i);
		// check to see that the layer is displayed in the legend
		$bDisplayInLegend = $oLayer->getmetadata('displayInLegend');
		if($bDisplayInLegend == false) {
		 	$oLayer->set("status", MS_ON);
		} else {
			$oLayer->set("status", MS_OFF);
		}
	}
	
	$aLayers = @split(',',$szLayers);
	
		// cycle thru map layers
		for ($i=0;$i<$oMap->numlayers;$i++){
			$oLayer=$oMap->GetLayer($i);
			
			//cycle thru visable layers from app.
			for($j=0;$j<count($aLayers);$j++){
				
				// found app == map layer
				if($aLayers[$j] == $oLayer->name){
					$oLayer->set("status", MS_ON);
				}

			}
		}
}

function make_archive( $dir , &$zip, $extdir="")
{
if (is_dir($dir)) {
   if ($dh = opendir($dir)) {
	   while (($file = readdir($dh)) !== false ) {
		   if( $file != "." && $file != ".." )
			   {
			   if( is_dir( $dir . $file ) )
			   {
			   $zip->addFile($dir.$file,$extdir.$file);
			   //echo "<br>add:".$dir.$file;
			   make_archive($dir.$file."/" , $zip, $extdir.$file."/");
			   }
			   else
			   {
			   $zip->addFile($dir.$file,$extdir.$file);    
			   //echo "<br>add:".$dir.$file;                                                    
			   }
		   }
	   }
	   closedir($dh);
   }
}
return true;
}


function unzip($src_file, $dest_dir=false, $create_zip_name_dir=true, $overwrite=true)
{
  if(function_exists("zip_open"))
  {  
      if(!is_resource(zip_open($src_file)))
      {
          $src_file=dirname($_SERVER['SCRIPT_FILENAME'])."/".$src_file;
      }
     
      if (is_resource($zip = zip_open($src_file)))
      {         
          $splitter = ($create_zip_name_dir === true) ? "." : "/";
          if ($dest_dir === false) $dest_dir = substr($src_file, 0, strrpos($src_file, $splitter))."/";
        
          // Create the directories to the destination dir if they don't already exist
          create_dirs($dest_dir);

          // For every file in the zip-packet
          while ($zip_entry = zip_read($zip))
          {
            // Now we're going to create the directories in the destination directories
          
            // If the file is not in the root dir
            $pos_last_slash = strrpos(zip_entry_name($zip_entry), "/");
            if ($pos_last_slash !== false)
            {
              // Create the directory where the zip-entry should be saved (with a "/" at the end)
              create_dirs($dest_dir.substr(zip_entry_name($zip_entry), 0, $pos_last_slash+1));
            }

            // Open the entry
            if (zip_entry_open($zip,$zip_entry,"r"))
            {
            
              // The name of the file to save on the disk
              $file_name = $dest_dir.zip_entry_name($zip_entry);
            
              // Check if the files should be overwritten or not
              if ($overwrite === true || $overwrite === false && !is_file($file_name))
              {
                // Get the content of the zip entry
                $fstream = zip_entry_read($zip_entry, zip_entry_filesize($zip_entry));          
               
                if(!is_dir($file_name))           
                file_put_contents($file_name, $fstream );
                // Set the rights
                if(file_exists($file_name))
                {
                    chmod($file_name, 0777);
                    //echo "<span style=\"color:#1da319;\">file saved: </span>".$file_name."<br />";
                }
                else
                {
                    //echo "<span style=\"color:red;\">file not found: </span>".$file_name."<br />";
                }
              }
            
              // Close the entry
              zip_entry_close($zip_entry);
            }     
          }
          // Close the zip-file
          zip_close($zip);
      }
      else
      {
        return false;
      }
    
      return true;
  }
  else
  {
      if(version_compare(phpversion(), "5.2.0", "<"))
      $infoVersion="(use PHP 5.2.0 or later)";
     
      echo "You need to install/enable the php_zip.dll extension $infoVersion";
  }
}

function create_dirs($path)
{
  if (!is_dir($path))
  {
    $directory_path = "";
    $directories = explode("/",$path);
    array_pop($directories);
  
    foreach($directories as $directory)
    {
      $directory_path .= $directory."/";
      if (!is_dir($directory_path))
      {
        mkdir($directory_path);
        chmod($directory_path, 0777);
      }
    }
  }
}

function generateKey($iLength = 7){
/*
    a character length of 7 = 3,521,614,606,208 possiblities.
*/
    $aKeyParts = array("a","A","b","B","c","C","d","D","e","E","f","F","g","G","h","H","i","I","j","J","k","K","l","L","m","M","n","N","o","O","p","P","q","Q","r","R","s","S","t","T","u","U","v","V","w","W","x","X","y","Y","z","Z","0","1","2","3","4","5","6","7","8","9");
    $szReturn = "";
    for($i=0;$i<$iLength;$i++){
        $szReturn = $szReturn.$aKeyParts[rand(0,count($aKeyParts)-1)];
    }
    return $szReturn;
}

function generateFileName(){
    $bSuccess = FALSE;
    $i=0;
    // there is a possibility that this could loop indefinately if the paths are set incorrectly so we'll add a count so it doesn't hang indefinately
    while($bSuccess === FALSE || $i == 100){
        $oReturn = NULL;
        $oReturn->keygen = generateKey(7);
        $oReturn->filename = STORED_SESSION_PATH."/ss_".$oReturn->keygen.".zip";
        if(!file_exists($oReturn->filename)){
            $bSuccess = TRUE;
        }
        $i++;
    }
    if($i == 100){
        die("{error: 'There is an issue with the paths set in SaveSessionConfig file.'}");
    }
    return $oReturn;
}

?>