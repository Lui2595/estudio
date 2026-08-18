<?php
    namespace App;

    class LRUCache
    {
        protected int $capacity;
        protected array $cache;
       /**
        * Class constructor.
        */
       public function __construct(int $capacity)
       {
            $this->capacity = $capacity; 
            $this->cache = [];
       }

       public function get(int $key)
       {
            $element = array_search($key,array_column($this->cache,"key"));
            // echo "aqui";
            // print_r($element);
            if ($element === false) {
                return -1;
            }
            $value = $this->cache[$element]["value"];
            $this->updateOrder($element,$key,$value);
            return $value;
       }
       public function put(int $key, int $value) : void
       {
            if(count($this->cache) >= $this->capacity) {
                array_shift($this->cache);
            }
            $this->cache[] = ['key'=>$key, 'value'=> $value];

            // print_r( $this->cache);
       }

       private function updateOrder (int $index, int $key, int $value) : void {
            array_slice($this->cache,$index,1);     
            $this->put($key,$value);
       }
    }
    
    function run()
    {
        $src = "starter/cases.json";
        $file = file_get_contents($src);
        $cases =  json_decode($file)->cases;
       
        foreach ($cases as $c => $val) {
            // print_r($val);
            $cache = null;
            $response = [];
            foreach($val->ops as $op){
                switch ($op[0]) {
                    case 'LRUCache':
                        $cache = new LRUCache($op[1]);
                        break;
                    case 'get':
                        $response[] = $cache->get($op[1]);
                        break;
                    case 'put':
                        $cache->put($op[1],$op[2]);
                        break;
                }
            }
            print_r($response);
            print_r($val->expected);
            if($response == $val->expected) {
                echo "pass \n";
            }
        }
    }
    
    run();
?>