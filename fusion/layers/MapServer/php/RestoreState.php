<?php
ini_set("memory_limit","64M");
//dl('zip.so');
 /* set up the session */
include(dirname(__FILE__).'/Common.php');
include('../../../common/php/Utilities.php');

//header('Content-type: application/json');
//header('X-JSON: true');

isset($_POST["session"])?$szSessionID = $_POST["session"]:$szSessionID = NULL ;
isset($_REQUEST["id"])?$loadSessionID = $_REQUEST["id"]:$loadSessionID = NULL ;

$oReturn = NULL;

if (isset($_SESSION['fusionConfig'])) {

    $szStoreSessionPath = $_SESSION['fusionConfig']->mapserver->mapRestoreState;
    $szFilePhpSession = $_SESSION['fusionConfig']->mapserver->mapRestoreStateSession;

    $szDestination = $szFilePhpSession."/sess_".$szSessionID."/";

    $szTmpFileName = $_FILES["sessionFile"]["tmp_name"];
    $szZipFilename = $szStoreSessionPath."/ss_".$loadSessionID.".zip";
    $szControlFile = $szStoreSessionPath."/".$loadSessionID.".dat";

    if (file_exists($szZipFilename) && file_exists($szControlFile)){

        $aData = readSessionSaveControlFile($szControlFile);
        $bSuccessfull = unzip($szZipFilename, $szDestination, $create_zip_name_dir=true, $overwrite=true);

            if($aData && $bSuccessfull === TRUE){
                $oReturn->success = TRUE;
                $oReturn->mapname = $aData["mapname"];
                $oReturn->extents = $aData["_afCurrentExtents"];
                $oReturn->vislayers = $aData["aVisibleLayers"];
                $oReturn->sessionname = $aData["sessionName"];
                $oReturn->queryfile = $aData["queryfile"];
                $oReturn->loadmap = $szDestination."/".$oReturn->mapname.'.map';

                $oMap = ms_newMapObj($oReturn->loadmap);
                checkForGMLLayers($szDestination);
                // turn off all the layers
                for ($i=0;$i<$oMap->numlayers;$i++){
                    $oLayer=$oMap->GetLayer($i);
                    $oLayer->set("status", MS_OFF);
                    }
                // turn on the vis layers
                $aLayers = explode(",",$oReturn->vislayers);
                foreach($aLayers as $szName){
                    $oLayer = $oMap->getLayerByName($szName);
                    if($oLayer){
                        $oLayer->set("status", MS_ON);
                    }
                }
                $oMap->save($oReturn->loadmap);
                echo var2json($oReturn);
            }
            else
            {
                die("{'error':'Could not load session control file ".$loadSessionID. ".dat.'}");
            }
        }
        else
        {
        die("{'error':'map state ".$loadSessionID. " does not exist.'}");
        }
    }
    else
    {
    die("{'error':'PHP Session path is invalid.'}");
    }


function checkForGMLLayers($szDestination){
    global $oMap;
    @$oLayer = $oMap->getLayerByName("LWEGML-Point");
    if($oLayer){
    $oLayer->set("connection", $szDestination."/features.gml");
    }
    @$oLayer = $oMap->getLayerByName("LWEGML-Line");
    if($oLayer){
    $oLayer->set("connection", $szDestination."/features.gml");
    }
    @$oLayer = $oMap->getLayerByName("LWEGML-Polygon");
    if($oLayer){
    $oLayer->set("connection", $szDestination."/features.gml");
    }
    @$oLayer = $oMap->getLayerByName("LWEGML-Annotation");
    if($oLayer){
    $oLayer->set("connection", $szDestination."/features.gml");
    }
    @$oLayer = $oMap->getLayerByName("LWEGML-Circle");
    if($oLayer){
    $oLayer->set("connection", $szDestination."/features.gml");
    }
    @$oLayer = $oMap->getLayerByName("LWEGML-Rectangle");
    if($oLayer){
    $oLayer->set("connection", $szDestination."/features.gml");
    }
}

function readSessionSaveControlFile($szFileName){

$handle = @fopen($szFileName, "r");

if($handle)
    {
    $szData = fread($handle, filesize($szFileName));
    fclose($handle);
    }

return unserialize($szData);
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
                    chmod($file_name, 0755);
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
      die("error:'You need to install/enable the php_zip.dll extension $infoVersion'");
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
?>