<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pet>
 */
class PetFactory extends Factory
{
    private const SPECIES = ['Dog', 'Cat', 'Bird', 'Fish', 'Rabbit', 'Hamster', 'Guinea Pig', 'Turtle'];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $dateOfBirth = $this->faker->dateTimeBetween('-15 years', '-1 month');
        $dateOfDeath = $this->faker->boolean(30)
            ? $this->faker->dateTimeBetween($dateOfBirth, 'now')
            : null;

        return [
            'name' => $this->faker->firstName(),
            'species' => $this->faker->randomElement(self::SPECIES),
            'date_of_birth' => $dateOfBirth,
            'date_of_death' => $dateOfDeath,
            'note' => $this->faker->optional(0.7)->sentence(10),
        ];
    }


}
