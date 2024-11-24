// object balls的屬性
let object_balls_properties = [
    {x: 235, y: 100},
    {x: 540, y: 254},
    {x: 354, y: 100}
]

class generation{
    constructor(population_size){
        this.population_size = population_size;
        this.population = new Array(this.population_size);

        for(let i = 0; i < population_size; ++i){
            this.population[i] = new cromosome();
            this.population[i].rand_gen_data();
        }
    }

    calculate(){
        let cnt = 0;
        let end_cnt = 0; //已結束運算的染色體數量
        let timer = setInterval(() => {
            // 終止條件
            if(end_cnt >= this.population_size) {
                clearInterval(timer);
                return;
            }

            // 當有空閒game時，將一個染色體放入game中
            if(cnt < this.population_size && !idle_games.isEmpty()){
                let idx = idle_games.dequeue();
                games[idx].init(cnt);
                games[idx].input_object(object_balls_properties);
                games[idx].input_cue(this.population[cnt].data());
                ++cnt;
            }

            // update
            for (let i = 0; i < number_of_games; ++i){
                if(!games[i].isEnd && games[i].check_isEnd()) {
                    idle_games.enqueue(i);
                    ++end_cnt;
                    console.log(end_cnt);
                    continue;
                }
                games[i].update();
            }
        }, 1);
    }
}