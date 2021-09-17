<?php

    class Credits extends DBHandler {
        
        private $conn;
        
        public function __construct()
        {
            $this->conn = $this->connectDB();
        }

        public function addCreditor($Fname,$Credits) {
            $stmt = $this->prepareQuery($this->conn, "INSERT INTO credits_tb(Fname,Credits) VALUES(?,?)","ss",array($Fname,$Credits));
            return $this->execute($stmt);
        }

        public function getAllCreditor(){
            $stmt = $this->prepareQuery($this->conn,"SELECT * FROM credits_tb ORDER BY Fname ASC");
            return $this->fetchAssoc($stmt);
        }

        public function updateCreditor(){

        }

        public function sumRequired(){
            $stmt = $this->prepareQuery($this->conn,"SELECT COALESCE(SUM(Credits),0) FROM credits_tb WHERE Fname = 'lucky' ");
            return $this->fetchAssoc($stmt);
        }

    }

?>