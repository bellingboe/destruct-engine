<?php
class Database extends DatabaseCore {
    
    var $Link_ID  = 0;                      // Result of mysql_connect().
    var $Query_ID = 0;                      // Result of most recent mysql_query().
    var $Record   = array();                // current mysql_fetch_array()-result.
    var $Row;                               // current row number.
    var $LoginError = "";
 
    var $Errno    = 0;
    var $Error    = "";
    
    static function factory() {
        return new self();
    }
 
//-------------------------------------------
//    Connects to the database
//-------------------------------------------
    function connect()
        {
        if( 0 == $this->Link_ID )
            $this->Link_ID=mysql_connect( $this->Host, $this->User, $this->Password );
        if( !$this->Link_ID )
            $this->halt( "Link-ID == false, connect failed" );
        if( !mysql_query( sprintf( "use %s", $this->Database ), $this->Link_ID ) )
            $this->halt( "cannot use database ".$this->Database );
        }
 
//-------------------------------------------
//    Queries the database
//-------------------------------------------
    function query( $Query_String )
        {
        $this->connect();
        $this->Query_ID = mysql_query( $Query_String,$this->Link_ID );
        $this->Row = 0;
        $this->Errno = mysql_errno();
        $this->Error = mysql_error();
        if( !$this->Query_ID )
            $this->halt( "Invalid SQL: ".$Query_String );
        return $this->Query_ID;
        } // end function query
 
//-------------------------------------------
//    If error, halts the program
//-------------------------------------------
    function halt( $msg )
        {
        printf( "
<strong>Database error:</strong> %s
n", $msg );
        printf( "<strong>MySQL Error</strong>: %s (%s)
n", $this->Errno, $this->Error );
        die( "Session halted." );
        } // end function halt
 
//-------------------------------------------
//    Retrieves the next record in a recordset
//-------------------------------------------
    function nextRecord()
        {
        @ $this->Record = mysql_fetch_array( $this->Query_ID );
        $this->Row += 1;
        $this->Errno = mysql_errno();
        $this->Error = mysql_error();
        $stat = is_array( $this->Record );
        if( !$stat )
            {
            @ mysql_free_result( $this->Query_ID );
            $this->Query_ID = 0;
            }
        return $stat;
        } // end function nextRecord
 
//-------------------------------------------
//    Retrieves a single record
//-------------------------------------------
    function singleRecord()
        {
        $this->Record = mysql_fetch_array( $this->Query_ID );
        $stat = is_array( $this->Record );
        return $stat;
        } // end function singleRecord
 
//-------------------------------------------
//    Returns the number of rows  in a recordset
//-------------------------------------------
    function numRows()
        {
        return mysql_num_rows( $this->Query_ID );
        } // end function numRows
 
//-------------------------------------------
//    Returns the Last Insert Id
//-------------------------------------------
    function lastId()
        {
        return mysql_insert_id();
        } // end function numRows
 
//-------------------------------------------
//    Returns Escaped string
//-------------------------------------------
    function mysql_escape_mimic($inp)
        {
        if(is_array($inp))
            return array_map(__METHOD__, $inp);
        if(!empty($inp) && is_string($inp)) {
            return str_replace(array('\\', "\0", "\n", "\r", "'", '"', "\x1a"), array('\\\\', '\\0', '\\n', '\\r', "\\'", '\\"', '\\Z'), $inp);
        }
        return $inp;
        }
//-------------------------------------------
//    Returns the number of rows  in a recordset
//-------------------------------------------
    function affectedRows()
        {
            return mysql_affected_rows();
        } // end function numRows
 
//-------------------------------------------
//    Returns the number of fields in a recordset
//-------------------------------------------
    function numFields()
        {
            return mysql_num_fields($this->Query_ID);
        } // end function numRows
 
    } // end class Database
/* From: kjventura.com */