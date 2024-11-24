class generation{
    constructor(id, population_size){
        this.id = id;
        this.population_size = population_size;
        this.population = new Array(this.population_size);
        this.fitness = new Array(this.population_size);
        this.total_fitness = 0;
        this.timer = null;

        this.tb = {
            1: 0,
            2: 0,
            3: 0,
        }

        for(let i = 0; i < population_size; ++i){
            this.population[i] = new cromosome();
        }
    }

    rand_generation(){
        for(let i = 0; i < population_size; ++i){
            this.population[i].rand_gen_data();
        }
    }

    next_generation(){
        let gap = 1 / this.total_fitness;
        let roullte = new Array(this.population_size);
        let tmp = 0;
        for(let i = 0; i < this.population_size; ++i){
            roullte[i] = tmp + gap * this.fitness[i];
            tmp = roullte[i];
        }

        let new_generation = new generation(this.id+1, this.population_size);
        for(let i = 0; i < this.population_size; ++i){
            let p1 = Math.random();
            let p2 = Math.random();
            let idx1 = 0, idx2 = 0;
            for(let j = 0; j < this.population_size; ++j){
                if(this.fitness[j] == 0) continue;
                if(roullte[j] < p1) idx1 = j;
                if(roullte[j] < p2) idx2 = j;
            }
            new_generation.population[i] = crossover(this.population[idx1], this.population[idx2]);
        }

        return new_generation;
    }

    /*calculate() { return new Promise((resolve, reject) => {
        let cnt = 0;
        let end_cnt = 0; //已結束運算的染色體數量
        this.timer = setInterval(() => {
            // 終止條件
            if(end_cnt >= this.population_size) {
                clearInterval(this.timer);
                return resolve(this.next_generation());
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
                    this.fitness[games[i].id] = (games[i].score > 0? games[i].score: 0);

                    if(this.fitness[games[i].id] == 1) this.fitness[games[i].id] = 3;
                    if(this.fitness[games[i].id] == 2) this.fitness[games[i].id] = 7;
                    if(this.fitness[games[i].id] == 3) this.fitness[games[i].id] = 18;

                    this.total_fitness += this.fitness[games[i].id];

                    idle_games.enqueue(i);
                    ++end_cnt;
                    //console.log(end_cnt);
                    continue;
                }
                games[i].update();
            }
        }, 0.001);*/

        calculate() { return new Promise((resolve, reject) => {
            let cnt = 0;
            let end_cnt = 0; //已結束運算的染色體數量
            while(1) {
                // 終止條件
                if(end_cnt >= this.population_size) {
                    //clearInterval(this.timer);
                    return resolve(this.next_generation());
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
                        this.fitness[games[i].id] = (games[i].score > 0? games[i].score: 0);

                        if(this.fitness[games[i].id] == 1) this.tb[1] += 1;
                        if(this.fitness[games[i].id] == 2) this.tb[2] += 1;
                        if(this.fitness[games[i].id] == 3) this.tb[3] += 1;
    
                        if(this.fitness[games[i].id] == 1) this.fitness[games[i].id] = 1;
                        if(this.fitness[games[i].id] == 2) this.fitness[games[i].id] = 5;
                        if(this.fitness[games[i].id] == 3) this.fitness[games[i].id] = 100;
    
                        this.total_fitness += this.fitness[games[i].id];
    
                        idle_games.enqueue(i);
                        ++end_cnt;
                        //console.log(end_cnt);
                        continue;
                    }
                    games[i].update();
                }
            };
    });}
}